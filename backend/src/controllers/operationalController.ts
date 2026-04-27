import { Request, Response } from 'express';
import pool from '../config/db.js';

// --- ATTENDANCE ---
export const markAttendance = async (req: Request, res: Response) => {
  const { student_id, date, status, recorded_by } = req.body;
  try {
    await pool.query(
      `INSERT INTO student_attendance (student_id, date, status, recorded_by) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (student_id, date) DO UPDATE SET status = $3, recorded_by = $4`,
      [student_id, date, status, recorded_by]
    );
    res.json({ message: 'Attendance recorded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record attendance' });
  }
};

// --- NOTICES ---
export const getNotices = async (req: Request, res: Response) => {
  const { branch_id } = req.query;
  let query = 'SELECT * FROM notices';
  const params = [];
  if (branch_id) {
    query += ' WHERE branch_id = $1';
    params.push(branch_id);
  }
  query += ' ORDER BY created_at DESC';
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
};

// --- LOGISTICS ---
export const getLogisticsNotices = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM logistics_notices ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch logistics notices' });
  }
};
