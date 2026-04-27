import { Request, Response } from 'express';
import pool from '../config/db.js';

export const getExams = async (req: Request, res: Response) => {
  const { course_id } = req.query;
  let query = 'SELECT * FROM exams WHERE is_hidden = false';
  const params = [];

  if (course_id) {
    query += ' AND course_id = $1';
    params.push(course_id);
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
};

export const getExamDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const examResult = await pool.query('SELECT * FROM exams WHERE id = $1', [id]);
    if (examResult.rows.length === 0) return res.status(404).json({ error: 'Exam not found' });

    const questionsResult = await pool.query(`
      SELECT q.*, 
             json_agg(o.* ORDER BY o.sort_order) as options
      FROM exam_questions q
      LEFT JOIN exam_question_options o ON q.id = o.question_id
      WHERE q.exam_id = $1
      GROUP BY q.id
      ORDER BY q.sort_order ASC
    `, [id]);

    res.json({
      ...examResult.rows[0],
      questions: questionsResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch exam questions' });
  }
};

export const submitExam = async (req: Request, res: Response) => {
  const { exam_id, student_id, answers, warning_count, started_at } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO exam_submissions (exam_id, student_id, answers, warning_count, started_at, submitted_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id`,
      [exam_id, student_id, JSON.stringify(answers), warning_count, started_at]
    );
    res.status(201).json({ message: 'Exam submitted successfully', submissionId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit exam' });
  }
};
