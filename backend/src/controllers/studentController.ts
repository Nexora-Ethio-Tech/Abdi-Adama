import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { withRLS } from '../utils/dbClient.js';

export const createStudent = async (req: Request, res: Response) => {
  const { 
    name, email, password, digital_id, branch_id, 
    grade, dob, gender, parent_name, parent_phone,
    emergency_contacts 
  } = req.body;

  try {
    const result = await withRLS(req, async (client) => {
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

      return studentId;
    });

    res.status(201).json({ message: 'Student created successfully', studentId: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create student' });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  const { branch_id, grade } = req.query;
  const user = (req as any).user;
  
  try {
    const rows = await withRLS(req, async (client) => {
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

      const result = await client.query(query, params);
      return result.rows;
    });

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const student = await withRLS(req, async (client) => {
      // Get student + user info
      const studentResult = await client.query(`
        SELECT s.*, u.name, u.email, u.digital_id, u.role, u.is_active 
        FROM students s
        JOIN users u ON s.user_id = u.id
        WHERE s.id = $1
      `, [id]);

      if (studentResult.rows.length === 0) {
        return null;
      }

      // Get emergency contacts
      const contactsResult = await client.query(
        'SELECT * FROM emergency_contacts WHERE student_id = $1', [id]
      );

      return {
        ...studentResult.rows[0],
        emergency_contacts: contactsResult.rows
      };
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch student details' });
  }
};
