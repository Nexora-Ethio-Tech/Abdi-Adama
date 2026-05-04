"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogisticsNotices = exports.getNotices = exports.markAttendance = void 0;
const dbClient_js_1 = require("../utils/dbClient.js");
// --- ATTENDANCE ---
const markAttendance = async (req, res) => {
    const { student_id, date, status, recorded_by } = req.body;
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            await client.query(`INSERT INTO student_attendance (student_id, date, status, recorded_by) 
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (student_id, date) DO UPDATE SET status = $3, recorded_by = $4`, [student_id, date, status, recorded_by]);
        });
        res.json({ message: 'Attendance recorded successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to record attendance' });
    }
};
exports.markAttendance = markAttendance;
// --- NOTICES ---
const getNotices = async (req, res) => {
    const { branch_id } = req.query;
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            let query = 'SELECT * FROM notices';
            const params = [];
            if (branch_id) {
                query += ' WHERE branch_id = $1';
                params.push(branch_id);
            }
            query += ' ORDER BY created_at DESC';
            const result = await client.query(query, params);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch notices' });
    }
};
exports.getNotices = getNotices;
// --- LOGISTICS ---
const getLogisticsNotices = async (req, res) => {
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query('SELECT * FROM logistics_notices ORDER BY created_at DESC');
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch logistics notices' });
    }
};
exports.getLogisticsNotices = getLogisticsNotices;
