import { Request, Response } from 'express';
import { withRLS } from '../utils/dbClient.js';

export const getTransactions = async (req: Request, res: Response) => {
  const { branch_id } = req.query;

  try {
    const rows = await withRLS(req, async (client) => {
      let query = 'SELECT * FROM finance_transactions';
      const params: any[] = [];

      if (branch_id) {
        query += ' WHERE branch_id = $1';
        params.push(branch_id);
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
