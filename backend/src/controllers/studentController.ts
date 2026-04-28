import { Request, Response } from 'express';
import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const createStudent = async (req: Request, res: Response) => {
  const { 
    name, email, password, digital_id, branch_id, 
    grade, dob, gender, parent_name, parent_phone,
    emergency_contacts 
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Create User (Provisioned students are auto-approved)
    const hashedPassword = await bcrypt.hash(password || 'AbdiAdama123', 10);
    const userResult = await client.query(
      `INSERT INTO users (name, email, password_hash, role, branch_id, digital_id, status) 
       VALUES ($1, $2, $3, 'student', $4, $5, 'Approved') RETURNING id`,
      [name, email, hashedPassword, branch_id, digital_id]
    );
    const userId = userResult.rows[0].id;

    // 2. Create Student profile
    const studentResult = await client.query(
      `INSERT INTO students (user_id, branch_id, grade, dob, gender, parent_name, parent_phone) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [userId, branch_id, grade, dob, gender, parent_name, parent_phone]
    );
    const studentId = studentResult.rows[0].id;

    // 3. Create Emergency Contacts if provided
    if (emergency_contacts && Array.isArray(emergency_contacts)) {
      for (const contact of emergency_contacts) {
        await client.query(
          `INSERT INTO emergency_contacts (student_id, name, relation, phone) 
           VALUES ($1, $2, $3, $4)`,
          [studentId, contact.name, contact.relation, contact.phone]
        );
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Student created successfully', studentId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Failed to create student' });
  } finally {
    client.release();
  }
};
export const getStudents = async (req: Request, res: Response) => {
  const { branch_id, grade } = req.query;
  const user = (req as any).user;
  
  let query = `
    SELECT s.*, u.name, u.email, u.digital_id, u.role, u.status as user_status
    FROM students s
    JOIN users u ON s.user_id = u.id
    WHERE 1=1
  `;
  const params: any[] = [];

  // Multi-tenant enforcement: Non-super-admins only see their branch
  if (user.role !== 'super-admin') {
    params.push(user.branch_id);
    query += ` AND s.branch_id = $${params.length}`;
  } else if (branch_id) {
    params.push(branch_id);
    query += ` AND s.branch_id = $${params.length}`;
  }

  if (grade) {
    params.push(grade);
    query += ` AND s.grade = $${params.length}`;
  }

  query += ` ORDER BY u.name ASC`;

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    // Get student + user info
    const studentResult = await pool.query(`
      SELECT s.*, u.name, u.email, u.digital_id, u.role, u.is_active 
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.id = $1
    `, [id]);

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const student = studentResult.rows[0];

    // Get emergency contacts
    const contactsResult = await pool.query(
      'SELECT * FROM emergency_contacts WHERE student_id = $1', [id]
    );

    res.json({
      ...student,
      emergency_contacts: contactsResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch student details' });
  }
};
