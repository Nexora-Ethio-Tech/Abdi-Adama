import bcrypt from 'bcrypt';
import { withRLS } from '../utils/dbClient.js';
// ─── CREATE STUDENT ──────────────────────────────────────────
export const createStudent = async (req, res) => {
    const { name, email, password, digital_id, branch_id, grade, section_id, dob, gender, parent_name, parent_phone, emergency_contacts, monthly_fee, bus_fee, penalty_fee, fee_status, fee_notes, blood_group, allergies, is_scholarship, is_bus_user, bio } = req.body;
    try {
        const result = await withRLS(req, async (client) => {
            const hashedPassword = await bcrypt.hash(password || 'AbdiAdama123', 10);
            const userResult = await client.query(`INSERT INTO users (name, email, password_hash, role, branch_id, digital_id, status)
         VALUES ($1, $2, $3, 'student', $4, $5, 'Approved') RETURNING id`, [name, email, hashedPassword, branch_id, digital_id]);
            const userId = userResult.rows[0].id;
            const fee_approval_status = fee_status === 'reduced' ? 'pending' : 'none';
            const studentResult = await client.query(`INSERT INTO students (
          user_id, branch_id, grade, section_id, dob, gender,
          parent_name, parent_phone, monthly_fee, bus_fee, penalty_fee,
          fee_status, fee_approval_status, fee_notes,
          blood_group, allergies, is_scholarship, is_bus_user, bio
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
        RETURNING id`, [
                userId, branch_id, grade, section_id, dob, gender,
                parent_name, parent_phone,
                monthly_fee || 0, bus_fee || 0, penalty_fee || 0,
                fee_status || 'standard', fee_approval_status, fee_notes,
                blood_group, allergies, is_scholarship || false, is_bus_user || false, bio
            ]);
            const studentId = studentResult.rows[0].id;
            // Update section count
            if (section_id) {
                await client.query('UPDATE academic_sections SET current_count = current_count + 1 WHERE id = $1', [section_id]);
            }
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
// ─── GET ALL STUDENTS ────────────────────────────────────────
export const getStudents = async (req, res) => {
    const { branch_id, grade, section_id } = req.query;
    const user = req.user;
    try {
        const rows = await withRLS(req, async (client) => {
            let query = `
        SELECT s.*, u.name, u.email, u.digital_id, u.role, u.status as user_status,
               ag.grade_level, acs.section_name,
               CONCAT('Grade ', ag.grade_level, ' - Section ', acs.section_name) as class_label
        FROM students s
        JOIN users u ON s.user_id = u.id
        LEFT JOIN academic_sections acs ON s.section_id = acs.id
        LEFT JOIN academic_grades ag ON acs.grade_id = ag.id
        WHERE 1=1
      `;
            const params = [];
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
            if (section_id) {
                params.push(section_id);
                query += ` AND s.section_id = $${params.length}`;
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
// ─── GET STUDENT BY ID ───────────────────────────────────────
export const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await withRLS(req, async (client) => {
            const studentResult = await client.query(`
        SELECT s.*, u.name, u.email, u.digital_id, u.role, u.status as user_status,
               ag.grade_level, acs.section_name,
               CONCAT('Grade ', ag.grade_level, ' - Section ', acs.section_name) as class_label
        FROM students s
        JOIN users u ON s.user_id = u.id
        LEFT JOIN academic_sections acs ON s.section_id = acs.id
        LEFT JOIN academic_grades ag ON acs.grade_id = ag.id
        WHERE s.id = $1
      `, [id]);
            if (studentResult.rows.length === 0)
                return null;
            const contactsResult = await client.query('SELECT * FROM emergency_contacts WHERE student_id = $1', [id]);
            return { ...studentResult.rows[0], emergency_contacts: contactsResult.rows };
        });
        if (!student)
            return res.status(404).json({ error: 'Student not found' });
        res.json(student);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch student details' });
    }
};
// ─── GET SELF (Student/Parent portal) ───────────────────────
export const getMyProfile = async (req, res) => {
    const user = req.user;
    try {
        const profile = await withRLS(req, async (client) => {
            const result = await client.query(`
        SELECT s.*, u.name, u.email, u.digital_id, u.status as user_status,
               ag.grade_level, acs.section_name,
               CONCAT('Grade ', ag.grade_level, ' - Section ', acs.section_name) as class_label
        FROM students s
        JOIN users u ON s.user_id = u.id
        LEFT JOIN academic_sections acs ON s.section_id = acs.id
        LEFT JOIN academic_grades ag ON acs.grade_id = ag.id
        WHERE s.user_id = $1
      `, [user.id]);
            if (result.rows.length === 0)
                return null;
            const contacts = await client.query('SELECT * FROM emergency_contacts WHERE student_id = $1', [result.rows[0].id]);
            return { ...result.rows[0], emergency_contacts: contacts.rows };
        });
        if (!profile)
            return res.status(404).json({ error: 'Student profile not found' });
        res.json(profile);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};
// ─── GET STUDENT GRADES ──────────────────────────────────────
export const getStudentGrades = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    // Students can only see their own
    const targetId = (user.role === 'student' || user.role === 'parent')
        ? 'me' : id;
    try {
        const rows = await withRLS(req, async (client) => {
            let studentId = id;
            if (targetId === 'me') {
                const s = await client.query('SELECT id FROM students WHERE user_id = $1', [user.id]);
                if (s.rows.length === 0)
                    return [];
                studentId = s.rows[0].id;
            }
            const result = await client.query(`
        SELECT ge.*, 
               ROUND((ge.score / NULLIF(ge.total, 0)) * 100, 1) as percentage
        FROM grade_entries ge
        WHERE ge.student_id = $1
        ORDER BY ge.academic_year DESC, ge.created_at DESC
      `, [studentId]);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch grades' });
    }
};
// ─── GET STUDENT COMMUNICATION LOGS ─────────────────────────
export const getStudentCommunicationLogs = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
        const rows = await withRLS(req, async (client) => {
            let studentId = id;
            if (user.role === 'student' || user.role === 'parent') {
                const s = await client.query('SELECT id FROM students WHERE user_id = $1', [user.id]);
                if (s.rows.length === 0)
                    return [];
                studentId = s.rows[0].id;
            }
            const result = await client.query(`
        SELECT cl.*, u.name as teacher_name
        FROM communication_logs cl
        LEFT JOIN teachers t ON cl.teacher_id = t.id
        LEFT JOIN users u ON t.user_id = u.id
        WHERE cl.student_id = $1
        ORDER BY cl.week_ending DESC
      `, [studentId]);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch communication logs' });
    }
};
// ─── GET STUDENT ACADEMIC HISTORY ────────────────────────────
export const getStudentHistory = async (req, res) => {
    const user = req.user;
    try {
        const rows = await withRLS(req, async (client) => {
            const s = await client.query('SELECT id FROM students WHERE user_id = $1', [user.id]);
            if (s.rows.length === 0)
                return [];
            const studentId = s.rows[0].id;
            const result = await client.query(`
        SELECT academic_year, semester, subject, score_type, score, total,
               ROUND((score / NULLIF(total, 0)) * 100, 1) as percentage
        FROM grade_entries
        WHERE student_id = $1
        ORDER BY academic_year DESC, semester DESC, subject ASC
      `, [studentId]);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch academic history' });
    }
};
// ─── GET MY COURSES (active semester) ────────────────────────
export const getMyCourses = async (req, res) => {
    const user = req.user;
    try {
        const rows = await withRLS(req, async (client) => {
            const s = await client.query('SELECT id, section_id FROM students WHERE user_id = $1', [user.id]);
            if (s.rows.length === 0)
                return [];
            const { id: studentId, section_id } = s.rows[0];
            // Get distinct subjects for student's section
            const subjects = await client.query(`
        SELECT DISTINCT tl.subject, u.name as teacher_name
        FROM teacher_loads tl
        JOIN teachers t ON tl.teacher_id = t.id
        JOIN users u ON t.user_id = u.id
        WHERE tl.section_id = $1
        ORDER BY tl.subject
      `, [section_id]);
            // For each subject, get grades
            const courses = [];
            for (const subj of subjects.rows) {
                const grades = await client.query(`
          SELECT score_type, score, total,
                 ROUND((score / NULLIF(total, 0)) * 100, 1) as percentage
          FROM grade_entries
          WHERE student_id = $1 AND subject = $2
          ORDER BY created_at DESC
        `, [studentId, subj.subject]);
                courses.push({
                    subject: subj.subject,
                    teacher: subj.teacher_name,
                    grades: grades.rows
                });
            }
            return courses;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};
// ─── UPDATE STUDENT FEES ─────────────────────────────────────
export const updateStudentFees = async (req, res) => {
    const { studentId, monthly_fee, bus_fee, penalty_fee, fee_status, fee_notes } = req.body;
    const user = req.user;
    try {
        await withRLS(req, async (client) => {
            const oldResult = await client.query('SELECT monthly_fee, bus_fee, penalty_fee, fee_status FROM students WHERE id = $1', [studentId]);
            const old = oldResult.rows[0];
            const fee_approval_status = fee_status === 'reduced' ? 'pending' : 'none';
            await client.query(`UPDATE students SET monthly_fee=$1, bus_fee=$2, penalty_fee=$3,
         fee_status=$4, fee_approval_status=$5, fee_notes=$6, updated_at=NOW()
         WHERE id=$7`, [monthly_fee, bus_fee, penalty_fee, fee_status, fee_approval_status, fee_notes, studentId]);
            await client.query(`INSERT INTO audit_log (student_id, category, direction, action_label, modified_by, old_value, new_value)
         VALUES ($1, 'Fees', 'Out', $2, $3, $4, $5)`, [studentId, `Fee update for student ${studentId}`, user.email,
                JSON.stringify(old), JSON.stringify({ monthly_fee, bus_fee, penalty_fee, fee_status })]);
        });
        res.json({ message: 'Fees updated and pending approval' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update student fees' });
    }
};
// ─── APPROVE FEE REDUCTION ───────────────────────────────────
export const approveFeeReduction = async (req, res) => {
    const { studentId, approved, approver_name } = req.body;
    const user = req.user;
    if (user.role !== 'auditor' && !user.is_branch_auditor && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized to approve fee reductions' });
    }
    try {
        await withRLS(req, async (client) => {
            const status = approved ? 'approved' : 'rejected';
            await client.query('UPDATE students SET fee_approval_status=$1, updated_at=NOW() WHERE id=$2', [status, studentId]);
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
// ─── GET SPECIAL STUDENTS ────────────────────────────────────
export const getSpecialStudents = async (req, res) => {
    const user = req.user;
    try {
        const rows = await withRLS(req, async (client) => {
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
// ─── SUBMIT GRADE ENTRY ───────────────────────────────────────
export const submitGradeEntry = async (req, res) => {
    const { student_id, section_id, subject, score_type, score, total, academic_year, semester } = req.body;
    const user = req.user;
    try {
        await withRLS(req, async (client) => {
            await client.query(`
        INSERT INTO grade_entries (student_id, section_id, subject, score_type, score, total, academic_year, semester, entered_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT DO NOTHING
      `, [student_id, section_id, subject, score_type, score, total, academic_year, semester, user.id]);
        });
        res.status(201).json({ message: 'Grade recorded successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to submit grade' });
    }
};
