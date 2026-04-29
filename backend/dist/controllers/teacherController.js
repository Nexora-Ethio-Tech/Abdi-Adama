import bcrypt from 'bcrypt';
import { withRLS } from '../utils/dbClient.js';
export const getTeachers = async (req, res) => {
    try {
        const rows = await withRLS(req, async (client) => {
            const result = await client.query(`
        SELECT t.*, u.name, u.email, u.digital_id, u.role, u.status as user_status
        FROM teachers t
        JOIN users u ON t.user_id = u.id
        ORDER BY u.name ASC
      `);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch teachers' });
    }
};
export const createTeacher = async (req, res) => {
    const { name, email, password, digital_id, branch_id, subjects, department, experience, bio } = req.body;
    try {
        await withRLS(req, async (client) => {
            const hashedPassword = await bcrypt.hash(password || 'Teacher@Abdi', 10);
            const userResult = await client.query(`INSERT INTO users (name, email, password_hash, role, branch_id, digital_id, status) 
         VALUES ($1, $2, $3, 'teacher', $4, $5, 'Approved') RETURNING id`, [name, email, hashedPassword, branch_id, digital_id]);
            const userId = userResult.rows[0].id;
            await client.query(`INSERT INTO teachers (user_id, branch_id, subjects, department, experience, bio) 
         VALUES ($1, $2, $3, $4, $5, $6)`, [userId, branch_id, subjects || [], department, experience, bio]);
        });
        res.status(201).json({ message: 'Teacher created successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create teacher' });
    }
};
