"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitExam = exports.getExamDetails = exports.getExams = void 0;
const dbClient_js_1 = require("../utils/dbClient.js");
const getExams = async (req, res) => {
    const { course_id } = req.query;
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            let query = 'SELECT * FROM exams WHERE is_hidden = false';
            const params = [];
            if (course_id) {
                query += ' AND course_id = $1';
                params.push(course_id);
            }
            const result = await client.query(query, params);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch exams' });
    }
};
exports.getExams = getExams;
const getExamDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const exam = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const examResult = await client.query('SELECT * FROM exams WHERE id = $1', [id]);
            if (examResult.rows.length === 0)
                return null;
            const questionsResult = await client.query(`
        SELECT q.*, 
               json_agg(o.* ORDER BY o.sort_order) as options
        FROM exam_questions q
        LEFT JOIN exam_question_options o ON q.id = o.question_id
        WHERE q.exam_id = $1
        GROUP BY q.id
        ORDER BY q.sort_order ASC
      `, [id]);
            return {
                ...examResult.rows[0],
                questions: questionsResult.rows
            };
        });
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.json(exam);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch exam questions' });
    }
};
exports.getExamDetails = getExamDetails;
const submitExam = async (req, res) => {
    const { exam_id, student_id, answers, warning_count, started_at } = req.body;
    try {
        const submissionId = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query(`INSERT INTO exam_submissions (exam_id, student_id, answers, warning_count, started_at, submitted_at) 
         VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id`, [exam_id, student_id, JSON.stringify(answers), warning_count, started_at]);
            return result.rows[0].id;
        });
        res.status(201).json({ message: 'Exam submitted successfully', submissionId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to submit exam' });
    }
};
exports.submitExam = submitExam;
