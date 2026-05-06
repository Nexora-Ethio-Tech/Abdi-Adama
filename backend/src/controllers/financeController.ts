import { Request, Response } from 'express';
import { withRLS } from '../utils/dbClient.js';

// ─── FINANCE SUMMARY (Dashboard) ─────────────────────────────
export const getFinanceSummary = async (req: Request, res: Response) => {
  const user = (req as any).user;
  try {
    const summary = await withRLS(req, async (client) => {
      const branchFilter = user.role !== 'super-admin' && user.role !== 'auditor'
        ? `AND t.branch_id = '${user.branch_id}'` : '';

      const result = await client.query(`
        SELECT
          COALESCE(SUM(CASE WHEN t.type = 'Income' THEN t.amount ELSE 0 END), 0) as total_revenue,
          COALESCE(SUM(CASE WHEN t.type = 'Expense' THEN t.amount ELSE 0 END), 0) as total_expenses,
          (SELECT COALESCE(SUM(monthly_fee + bus_fee + penalty_fee), 0)
           FROM students WHERE fee_status != 'paid' ${user.role !== 'super-admin' ? `AND branch_id = '${user.branch_id}'` : ''}) as pending_fees,
          COALESCE(SUM(CASE WHEN DATE_TRUNC('month', t.date::date) = DATE_TRUNC('month', NOW()) THEN t.amount ELSE 0 END), 0) as monthly_revenue
        FROM finance_transactions t
        WHERE t.type = 'Income' ${branchFilter}
      `);
      return result.rows[0];
    });
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch finance summary' });
  }
};


export const getTransactions = async (req: Request, res: Response) => {
  const { branch_id } = req.query;

  try {
    const user = (req as any).user;
    const rows = await withRLS(req, async (client) => {
      let query = `
        SELECT t.*, b.name as branch_name, u.digital_id as student_digital_id
        FROM finance_transactions t
        LEFT JOIN branches b ON t.branch_id = b.id
        LEFT JOIN students s ON t.student_id = s.id
        LEFT JOIN users u ON s.user_id = u.id
      `;
      const params: any[] = [];

      if (user.role !== 'super-admin' && user.role !== 'auditor') {
        params.push(user.branch_id);
        query += ' WHERE t.branch_id = $1';
      } else if (branch_id) {
        params.push(branch_id);
        query += ' WHERE t.branch_id = $1';
      }

      query += ' ORDER BY created_at DESC';

      const result = await client.query(query, params);
      return result.rows;
    });

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export const getSummaries = async (req: Request, res: Response) => {
  try {
    const rows = await withRLS(req, async (client) => {
      const result = await client.query('SELECT * FROM finance_summaries ORDER BY date DESC');
      return result.rows;
    });

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch finance summaries' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { student_id, student_name, amount, type, date, verified_by, branch_id } = req.body;
  
  try {
    const txId = await withRLS(req, async (client) => {
      // 1. Insert Transaction
      const txResult = await client.query(
        `INSERT INTO finance_transactions (student_id, student_name, amount, type, date, verified_by, branch_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [student_id, student_name, amount, type, date, verified_by, branch_id]
      );

      // 2. Log to Audit Trail
      await client.query(
        `INSERT INTO audit_log (student_id, student_name, action_label, category, direction, modified_by, status) 
         VALUES ($1, $2, $3, 'Fees', 'In', $4, true)`,
        [student_id, student_name, `Payment of ${amount} for ${type}`, verified_by]
      );

      return txResult.rows[0].id;
    });

    res.status(201).json({ message: 'Transaction recorded and audited', id: txId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record transaction' });
  }
};
