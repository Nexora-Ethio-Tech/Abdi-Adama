import { Request, Response } from 'express';
import { withRLS } from '../utils/dbClient.js';

// --- ATTENDANCE ---
export const markAttendance = async (req: Request, res: Response) => {
  const { student_id, date, status, recorded_by } = req.body;
  try {
    await withRLS(req, async (client) => {
      await client.query(
        `INSERT INTO student_attendance (student_id, date, status, recorded_by) 
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (student_id, date) DO UPDATE SET status = $3, recorded_by = $4`,
        [student_id, date, status, recorded_by]
      );
    });
    res.json({ message: 'Attendance recorded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record attendance' });
  }
};

// --- NOTICES ---
export const getNotices = async (req: Request, res: Response) => {
  const { branch_id } = req.query;
  try {
    const rows = await withRLS(req, async (client) => {
      let query = 'SELECT * FROM notices';
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
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
};

// --- LOGISTICS ---
export const getLogisticsNotices = async (req: Request, res: Response) => {
  try {
    const rows = await withRLS(req, async (client) => {
      const result = await client.query('SELECT * FROM logistics_notices ORDER BY created_at DESC');
      return result.rows;
    });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch logistics notices' });
  }
};
