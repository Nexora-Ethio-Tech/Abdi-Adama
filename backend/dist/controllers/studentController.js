"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecialStudents = exports.approveFeeReduction = exports.updateStudentFees = exports.getStudentById = exports.getStudents = exports.createStudent = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbClient_js_1 = require("../utils/dbClient.js");
const createStudent = async (req, res) => {
    const { name, email, password, digital_id, branch_id, grade, dob, gender, parent_name, parent_phone, emergency_contacts, monthly_fee, bus_fee, penalty_fee, fee_status, fee_notes } = req.body;
    try {
        const result = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // 1. Create User (Provisioned students are auto-approved)
            const hashedPassword = await bcrypt_1.default.hash(password || 'AbdiAdama123', 10);
            const userResult = await client.query(`INSERT INTO users (name, email, password_hash, role, branch_id, digital_id, status) 
         VALUES ($1, $2, $3, 'student', $4, $5, 'Approved') RETURNING id`, [name, email, hashedPassword, branch_id, digital_id]);
            const userId = userResult.rows[0].id;
            // 2. Create Student profile
            const fee_approval_status = fee_status === 'reduced' ? 'pending' : 'none';
            const studentResult = await client.query(`INSERT INTO students (user_id, branch_id, grade, dob, gender, parent_name, parent_phone, 
                               monthly_fee, bus_fee, penalty_fee, fee_status, fee_approval_status, fee_notes) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`, [userId, branch_id, grade, dob, gender, parent_name, parent_phone,
                monthly_fee || 0, bus_fee || 0, penalty_fee || 0, fee_status || 'standard', fee_approval_status, fee_notes]);
            const studentId = studentResult.rows[0].id;
            // 3. Create Emergency Contacts if provided
            if (emergency_contacts && Array.isArray(emergency_contacts)) {
                for (const contact of emergency_contacts) {
                    await client.query(`INSERT INTO emergency_contacts (student_id, name, relation, phone) 
             VALUES ($1, $2, $3, $4)`, [studentId, contact.name, contact.relation, contact.phone]);
                }
            }
            return studentId;
        });
        res.status(201).json({ message: 'Student created successfully', studentId: result });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create student' });
    }
};
exports.createStudent = createStudent;
const getStudents = async (req, res) => {
    const { branch_id, grade } = req.query;
    const user = req.user;
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            let query = `
        SELECT s.*, u.name, u.email, u.digital_id, u.role, u.status as user_status
        FROM students s
        JOIN users u ON s.user_id = u.id
        WHERE 1=1
      `;
            const params = [];
            // Multi-tenant enforcement: Non-super-admins only see their branch
            if (user.role !== 'super-admin') {
                params.push(user.branch_id);
                query += ` AND s.branch_id = $${params.length}`;
            }
            else if (branch_id) {
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};
exports.getStudents = getStudents;
const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await (0, dbClient_js_1.withRLS)(req, async (client) => {
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
            const contactsResult = await client.query('SELECT * FROM emergency_contacts WHERE student_id = $1', [id]);
            return {
                ...studentResult.rows[0],
                emergency_contacts: contactsResult.rows
            };
        });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch student details' });
    }
};
exports.getStudentById = getStudentById;
const updateStudentFees = async (req, res) => {
    const { studentId, monthly_fee, bus_fee, penalty_fee, fee_status, fee_notes } = req.body;
    const user = req.user;
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // 1. Get old values for audit
            const oldResult = await client.query('SELECT monthly_fee, bus_fee, penalty_fee, fee_status FROM students WHERE id = $1', [studentId]);
            const old = oldResult.rows[0];
            // 2. Update Student
            const fee_approval_status = fee_status === 'reduced' ? 'pending' : 'none';
            await client.query(`UPDATE students SET monthly_fee = $1, bus_fee = $2, penalty_fee = $3, fee_status = $4, fee_approval_status = $5, fee_notes = $6, updated_at = NOW() WHERE id = $7`, [monthly_fee, bus_fee, penalty_fee, fee_status, fee_approval_status, fee_notes, studentId]);
            // 3. Log to audit_log
            await client.query(`INSERT INTO audit_log (student_id, category, direction, action_label, modified_by, old_value, new_value) 
         VALUES ($1, 'Fees', 'Out', $2, $3, $4, $5)`, [studentId, `Fee update for student ${studentId}`, user.email, JSON.stringify(old), JSON.stringify({ monthly_fee, bus_fee, penalty_fee, fee_status })]);
        });
        res.json({ message: 'Fees updated and pending approval' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update student fees' });
    }
};
exports.updateStudentFees = updateStudentFees;
const approveFeeReduction = async (req, res) => {
    const { studentId, approved, approver_name } = req.body;
    const user = req.user;
    // Only auditor or branch auditor (or super-admin) can approve
    if (user.role !== 'auditor' && !user.is_branch_auditor && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized to approve fee reductions' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const status = approved ? 'approved' : 'rejected';
            await client.query('UPDATE students SET fee_approval_status = $1, updated_at = NOW() WHERE id = $2', [status, studentId]);
            await client.query(`INSERT INTO audit_log (student_id, category, direction, action_label, modified_by, approver_name) 
         VALUES ($1, 'Fees', 'In', $2, $3, $4)`, [studentId, `Fee reduction ${status}`, user.email, approver_name]);
        });
        res.json({ message: `Fee reduction ${approved ? 'approved' : 'rejected'}` });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to approve fee reduction' });
    }
};
exports.approveFeeReduction = approveFeeReduction;
const getSpecialStudents = async (req, res) => {
    const user = req.user;
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            let query = `
        SELECT s.*, u.name, u.email, u.digital_id, b.name as branch_name
        FROM students s
        JOIN users u ON s.user_id = u.id
        JOIN branches b ON s.branch_id = b.id
        WHERE s.fee_status = 'reduced'
      `;
            const params = [];
            if (user.role !== 'super-admin' && user.role !== 'auditor') {
                params.push(user.branch_id);
                query += ` AND s.branch_id = $${params.length}`;
            }
            query += ` ORDER BY s.fee_approval_status DESC, u.name ASC`;
            const result = await client.query(query, params);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch special students' });
    }
};
exports.getSpecialStudents = getSpecialStudents;
