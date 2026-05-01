import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role, branch_id } = req.body;

  // Provisioned roles (Student, Teacher) cannot self-register
  const provisionedRoles = ['student', 'teacher'];
  if (provisionedRoles.includes(role)) {
    return res.status(403).json({ error: 'Students and Teachers must be provisioned by an administrator.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Default status is 'Pending'
    // Special case for Super Admin email
    const status = email === 'abdiadamaschooloffice@gmail.com' ? 'Approved' : 'Pending';

    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role, branch_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, status',
      [name, email, hashedPassword, role, branch_id, status]
    );

    res.status(201).json({
      message: 'Registration successful. Your account is pending approval.',
      user: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body; // identifier can be email or digital_id

  try {
    // Auto-initialize primary Super Admin if it doesn't exist
    if (identifier === 'abdiadamaschooloffice@gmail.com' && password === 'ChangeMe123!') {
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [identifier]);
      if (existing.rows.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
          'INSERT INTO users (name, email, password_hash, role, status) VALUES ($1, $2, $3, $4, $5)',
          ['System Admin', identifier, hashedPassword, 'super-admin', 'Approved']
        );
      }
    }

    // Search by email OR digital_id
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR digital_id = $1', 
      [identifier]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check status
    if (user.status === 'Pending') {
      return res.status(403).json({ error: 'Your account is pending approval.' });
    }
    if (user.status === 'Revoked') {
      return res.status(403).json({ error: 'Your account has been revoked.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, branch_id: user.branch_id, status: user.status, is_branch_auditor: user.is_branch_auditor },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Determine dashboard redirect
    let dashboard = '/dashboard';
    if (user.role === 'super-admin') dashboard = '/super-admin-dashboard';
    else if (user.role === 'school-admin') dashboard = '/school-admin-dashboard';
    else if (user.role === 'teacher') dashboard = '/teacher-dashboard';
    else if (user.role === 'student') dashboard = '/student-dashboard';
    else if (user.role === 'parent') dashboard = '/parent-dashboard';
    else if (user.role === 'finance-clerk') dashboard = '/finance-dashboard';
    else if (user.role === 'vice-principal') dashboard = '/vice-principal-dashboard';
    else if (user.role === 'driver') dashboard = '/driver-dashboard';
    else if (user.role === 'auditor') dashboard = '/auditor-dashboard';
    else if (user.role === 'librarian') dashboard = '/library';
    else if (user.role === 'clinic-admin') dashboard = '/clinic';

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch_id: user.branch_id,
        is_branch_auditor: user.is_branch_auditor,
        status: user.status,
        digital_id: user.digital_id
      },
      redirect: dashboard
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
};
export const verify = async (req: Request, res: Response) => {
  // If the request made it here, authenticateToken middleware passed
  const user = (req as any).user;
  
  try {
    // Fetch latest user info from DB to ensure they aren't revoked/deleted since token issuance
    const result = await pool.query(
      'SELECT id, name, email, role, branch_id, status, digital_id FROM users WHERE id = $1',
      [user.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    const dbUser = result.rows[0];

    if (dbUser.status === 'Pending' || dbUser.status === 'Revoked') {
      return res.status(403).json({ error: `Account is ${dbUser.status}` });
    }

    res.json({ user: dbUser });
  } catch (err) {
    console.error('Error in verify endpoint:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  const { userId, status } = req.body;
  const adminRole = (req as any).user.role;

  try {
    // Fetch user to be updated
    const userResult = await pool.query('SELECT role, email FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const targetUserRole = userResult.rows[0].role;
    const targetUserEmail = userResult.rows[0].email;

    // Prevent anyone from modifying the root Super Admin
    if (targetUserEmail === 'abdiadamaschooloffice@gmail.com' && status !== 'Approved') {
       return res.status(403).json({ error: 'Cannot revoke root Super Admin' });
    }

    // Authorization logic
    if (adminRole === 'super-admin') {
      // Super Admin can approve/revoke School Admins
      if (targetUserRole !== 'school-admin') {
        return res.status(403).json({ error: 'Super Admin can only manage School Admins' });
      }
    } else if (adminRole === 'school-admin') {
      // School Admin can approve/revoke sub-roles
      const subRoles = ['vice-principal', 'teacher', 'finance-clerk', 'student', 'driver', 'parent', 'librarian', 'clinic-admin', 'auditor'];
      if (!subRoles.includes(targetUserRole)) {
        return res.status(403).json({ error: 'School Admin can only manage staff, students, and parents' });
      }
    } else {
      return res.status(403).json({ error: 'Unauthorized to update user status' });
    }

    await pool.query('UPDATE users SET status = $1, updated_at = NOW() WHERE id = $2', [status, userId]);

    res.json({ message: `User status updated to ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during status update' });
  }
};

export const getPendingUsers = async (req: Request, res: Response) => {
  const adminRole = (req as any).user.role;

  try {
    let query = 'SELECT id, name, email, role, status, created_at FROM users WHERE status = \'Pending\'';
    let params: any[] = [];

    if (adminRole === 'super-admin') {
      query += ' AND role = \'school-admin\'';
    } else if (adminRole === 'school-admin') {
      query += ' AND role != \'super-admin\' AND role != \'school-admin\'';
      // Optionally filter by branch_id if School Admin is branch-specific
      if ((req as any).user.branch_id) {
        query += ' AND branch_id = $1';
        params.push((req as any).user.branch_id);
      }
    } else {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching pending users' });
  }
};
