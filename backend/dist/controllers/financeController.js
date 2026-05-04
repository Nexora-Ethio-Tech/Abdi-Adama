"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.getSummaries = exports.getTransactions = void 0;
const dbClient_js_1 = require("../utils/dbClient.js");
const getTransactions = async (req, res) => {
    const { branch_id } = req.query;
    try {
        const user = req.user;
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            let query = `
        SELECT t.*, b.name as branch_name, u.digital_id as student_digital_id
        FROM finance_transactions t
        LEFT JOIN branches b ON t.branch_id = b.id
        LEFT JOIN students s ON t.student_id = s.id
        LEFT JOIN users u ON s.user_id = u.id
      `;
            const params = [];
            if (user.role !== 'super-admin' && user.role !== 'auditor') {
                params.push(user.branch_id);
                query += ' WHERE t.branch_id = $1';
            }
            else if (branch_id) {
                params.push(branch_id);
                query += ' WHERE t.branch_id = $1';
            }
            query += ' ORDER BY created_at DESC';
            const result = await client.query(query, params);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};
exports.getTransactions = getTransactions;
const getSummaries = async (req, res) => {
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query('SELECT * FROM finance_summaries ORDER BY date DESC');
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch finance summaries' });
    }
};
exports.getSummaries = getSummaries;
const createTransaction = async (req, res) => {
    const { student_id, student_name, amount, type, date, verified_by, branch_id } = req.body;
    try {
        const txId = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // 1. Insert Transaction
            const txResult = await client.query(`INSERT INTO finance_transactions (student_id, student_name, amount, type, date, verified_by, branch_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`, [student_id, student_name, amount, type, date, verified_by, branch_id]);
            // 2. Log to Audit Trail
            await client.query(`INSERT INTO audit_log (student_id, student_name, action_label, category, direction, modified_by, status) 
         VALUES ($1, $2, $3, 'Fees', 'In', $4, true)`, [student_id, student_name, `Payment of ${amount} for ${type}`, verified_by]);
            return txResult.rows[0].id;
        });
        res.status(201).json({ message: 'Transaction recorded and audited', id: txId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to record transaction' });
    }
};
exports.createTransaction = createTransaction;
