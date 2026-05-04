"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeacherSchedule = exports.removeDepartmentHead = exports.assignDepartmentHead = exports.removeExamAssignment = exports.assignExaminer = exports.removeRoomTeacher = exports.assignRoomTeacher = exports.getTeacherById = exports.createTeacher = exports.getTeachers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbClient_js_1 = require("../utils/dbClient.js");
// ============================================================
// MODULE 4: TEACHER LIFECYCLE & DYNAMIC ASSIGNMENTS
// ============================================================
const getTeachers = async (req, res) => {
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query(`
        SELECT 
          t.*, 
          u.name, u.email, u.digital_id, u.role, u.status as user_status,
          s.section_name as room_section_name,
          g.grade_level as room_grade_level,
          json_agg(DISTINCT jsonb_build_object(
            'id', tea.id,
            'exam_title', tea.exam_title,
            'exam_date', tea.exam_date,
            'assigned_class', tea.assigned_class
          )) FILTER (WHERE tea.id IS NOT NULL AND tea.is_active = TRUE) as exam_assignments,
          json_agg(DISTINCT jsonb_build_object(
            'id', tdh.id,
            'department_name', tdh.department_name
          )) FILTER (WHERE tdh.id IS NOT NULL AND tdh.is_active = TRUE) as department_heads
        FROM teachers t
        JOIN users u ON t.user_id = u.id
        LEFT JOIN academic_sections s ON t.assigned_room_section_id = s.id
        LEFT JOIN academic_grades g ON s.grade_id = g.id
        LEFT JOIN teacher_exam_assignments tea ON t.id = tea.teacher_id
        LEFT JOIN teacher_department_heads tdh ON t.id = tdh.teacher_id
        GROUP BY t.id, u.id, s.id, g.id
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
exports.getTeachers = getTeachers;
const createTeacher = async (req, res) => {
    const { name, email, branch_id, subjects, department, experience, bio, age, sex, emergency_contact, background_details } = req.body;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        const credentials = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Generate teacher ID
            const year = new Date().getFullYear();
            const countResult = await client.query(`SELECT COUNT(*) FROM users WHERE username LIKE $1`, [`TEA/${year}/%`]);
            const sequence = parseInt(countResult.rows[0].count) + 1;
            const teacherUsername = `TEA/${year}/${sequence.toString().padStart(3, '0')}`;
            // Generate 6-digit password
            const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
            const hashedPassword = await bcrypt_1.default.hash(tempPassword, 10);
            const userResult = await client.query(`INSERT INTO users (username, name, email, password_hash, role, branch_id, digital_id, status) 
         VALUES ($1, $2, $3, $4, 'teacher', $5, $1, 'Approved') RETURNING id`, [teacherUsername, name, email || `${teacherUsername.replace(/\//g, '').toLowerCase()}@abdi-adama.com`,
                hashedPassword, branch_id || user.branch_id]);
            const userId = userResult.rows[0].id;
            await client.query(`INSERT INTO teachers (user_id, branch_id, subjects, department, experience, bio, age, sex, emergency_contact, background_details) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [userId, branch_id || user.branch_id, subjects || [], department, experience, bio, age, sex, emergency_contact, background_details]);
            // Log credentials
            await client.query(`INSERT INTO credential_logs (user_id, digital_id, initial_password, generated_by)
         VALUES ($1, $2, $3, $4)`, [userId, teacherUsername, tempPassword, user.id]);
            return { teacherUsername, tempPassword };
        });
        res.status(201).json({
            message: 'Teacher created successfully',
            credentials
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create teacher' });
    }
};
exports.createTeacher = createTeacher;
/**
 * Get teacher by ID with full details
 */
const getTeacherById = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query(`
        SELECT 
          t.*, 
          u.name, u.email, u.digital_id, u.role, u.is_active,
          s.section_name as room_section_name,
          g.grade_level as room_grade_level
        FROM teachers t
        JOIN users u ON t.user_id = u.id
        LEFT JOIN academic_sections s ON t.assigned_room_section_id = s.id
        LEFT JOIN academic_grades g ON s.grade_id = g.id
        WHERE t.id = $1
      `, [id]);
            if (result.rows.length === 0) {
                return null;
            }
            // Get exam assignments
            const examResult = await client.query(`
        SELECT * FROM teacher_exam_assignments
        WHERE teacher_id = $1 AND is_active = TRUE
        ORDER BY exam_date DESC
      `, [id]);
            // Get department heads
            const deptResult = await client.query(`
        SELECT * FROM teacher_department_heads
        WHERE teacher_id = $1 AND is_active = TRUE
      `, [id]);
            // Get schedule
            const scheduleResult = await client.query(`
        SELECT * FROM schedules
        WHERE teacher_id = $1
        ORDER BY 
          CASE day
            WHEN 'Monday' THEN 1
            WHEN 'Tuesday' THEN 2
            WHEN 'Wednesday' THEN 3
            WHEN 'Thursday' THEN 4
            WHEN 'Friday' THEN 5
            WHEN 'Saturday' THEN 6
            WHEN 'Sunday' THEN 7
          END, time_slot
      `, [id]);
            return {
                ...result.rows[0],
                exam_assignments: examResult.rows,
                department_heads: deptResult.rows,
                schedule: scheduleResult.rows
            };
        });
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json(teacher);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch teacher details' });
    }
};
exports.getTeacherById = getTeacherById;
/**
 * Assign teacher as Room Teacher
 */
const assignRoomTeacher = async (req, res) => {
    const { teacherId } = req.params;
    const { section_id } = req.body;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Update teacher
            await client.query(`
        UPDATE teachers 
        SET is_room_teacher = TRUE, 
            assigned_room_section_id = $1,
            updated_at = NOW()
        WHERE id = $2
      `, [section_id, teacherId]);
            // Update section
            await client.query(`
        UPDATE academic_sections
        SET room_teacher_id = $1,
            updated_at = NOW()
        WHERE id = $2
      `, [teacherId, section_id]);
        });
        res.json({ message: 'Room teacher assigned successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to assign room teacher' });
    }
};
exports.assignRoomTeacher = assignRoomTeacher;
/**
 * Remove room teacher assignment
 */
const removeRoomTeacher = async (req, res) => {
    const { teacherId } = req.params;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Get current section
            const teacherResult = await client.query('SELECT assigned_room_section_id FROM teachers WHERE id = $1', [teacherId]);
            const sectionId = teacherResult.rows[0]?.assigned_room_section_id;
            // Update teacher
            await client.query(`
        UPDATE teachers 
        SET is_room_teacher = FALSE, 
            assigned_room_section_id = NULL,
            updated_at = NOW()
        WHERE id = $1
      `, [teacherId]);
            // Update section if exists
            if (sectionId) {
                await client.query(`
          UPDATE academic_sections
          SET room_teacher_id = NULL,
              updated_at = NOW()
          WHERE id = $1
        `, [sectionId]);
            }
        });
        res.json({ message: 'Room teacher assignment removed successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove room teacher assignment' });
    }
};
exports.removeRoomTeacher = removeRoomTeacher;
/**
 * Assign teacher as Examiner
 */
const assignExaminer = async (req, res) => {
    const { teacherId } = req.params;
    const { exam_title, exam_date, assigned_class, exam_id } = req.body;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Create exam assignment
            await client.query(`
        INSERT INTO teacher_exam_assignments 
          (teacher_id, exam_id, exam_title, exam_date, assigned_class, assigned_by, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, TRUE)
      `, [teacherId, exam_id, exam_title, exam_date, assigned_class, user.id]);
            // Mark teacher as examiner
            await client.query(`
        UPDATE teachers 
        SET is_examiner = TRUE, updated_at = NOW()
        WHERE id = $1
      `, [teacherId]);
        });
        res.json({ message: 'Examiner assigned successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to assign examiner' });
    }
};
exports.assignExaminer = assignExaminer;
/**
 * Remove exam assignment
 */
const removeExamAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Soft delete assignment
            await client.query(`
        UPDATE teacher_exam_assignments 
        SET is_active = FALSE
        WHERE id = $1
      `, [assignmentId]);
            // Check if teacher has any other active exam assignments
            const result = await client.query(`
        SELECT teacher_id 
        FROM teacher_exam_assignments 
        WHERE id = $1
      `, [assignmentId]);
            const teacherId = result.rows[0]?.teacher_id;
            if (teacherId) {
                const countResult = await client.query(`
          SELECT COUNT(*) 
          FROM teacher_exam_assignments 
          WHERE teacher_id = $1 AND is_active = TRUE
        `, [teacherId]);
                const activeCount = parseInt(countResult.rows[0].count);
                // If no more active assignments, remove examiner flag
                if (activeCount === 0) {
                    await client.query(`
            UPDATE teachers 
            SET is_examiner = FALSE, updated_at = NOW()
            WHERE id = $1
          `, [teacherId]);
                }
            }
        });
        res.json({ message: 'Exam assignment removed successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove exam assignment' });
    }
};
exports.removeExamAssignment = removeExamAssignment;
/**
 * Assign teacher as Department Head
 */
const assignDepartmentHead = async (req, res) => {
    const { teacherId } = req.params;
    const { department_name } = req.body;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Create department head assignment
            await client.query(`
        INSERT INTO teacher_department_heads 
          (teacher_id, department_name, assigned_by, is_active)
        VALUES ($1, $2, $3, TRUE)
        ON CONFLICT (teacher_id, department_name) 
        DO UPDATE SET is_active = TRUE
      `, [teacherId, department_name, user.id]);
            // Mark teacher as dean
            await client.query(`
        UPDATE teachers 
        SET is_dean = TRUE, department = $1, updated_at = NOW()
        WHERE id = $2
      `, [department_name, teacherId]);
        });
        res.json({ message: 'Department head assigned successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to assign department head' });
    }
};
exports.assignDepartmentHead = assignDepartmentHead;
/**
 * Remove department head assignment
 */
const removeDepartmentHead = async (req, res) => {
    const { assignmentId } = req.params;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Get teacher_id before deletion
            const result = await client.query(`
        SELECT teacher_id FROM teacher_department_heads WHERE id = $1
      `, [assignmentId]);
            const teacherId = result.rows[0]?.teacher_id;
            // Soft delete assignment
            await client.query(`
        UPDATE teacher_department_heads 
        SET is_active = FALSE
        WHERE id = $1
      `, [assignmentId]);
            // Check if teacher has any other active department assignments
            if (teacherId) {
                const countResult = await client.query(`
          SELECT COUNT(*) 
          FROM teacher_department_heads 
          WHERE teacher_id = $1 AND is_active = TRUE
        `, [teacherId]);
                const activeCount = parseInt(countResult.rows[0].count);
                // If no more active assignments, remove dean flag
                if (activeCount === 0) {
                    await client.query(`
            UPDATE teachers 
            SET is_dean = FALSE, updated_at = NOW()
            WHERE id = $1
          `, [teacherId]);
                }
            }
        });
        res.json({ message: 'Department head assignment removed successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove department head assignment' });
    }
};
exports.removeDepartmentHead = removeDepartmentHead;
/**
 * Update teacher schedule (purge old data before update)
 */
const updateTeacherSchedule = async (req, res) => {
    const { teacherId } = req.params;
    const { schedule } = req.body; // Array of schedule items
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Delete old schedule data (purge to minimize traffic/storage)
            await client.query(`
        DELETE FROM schedules WHERE teacher_id = $1
      `, [teacherId]);
            // Insert new schedule
            if (schedule && Array.isArray(schedule)) {
                for (const item of schedule) {
                    await client.query(`
            INSERT INTO schedules (teacher_id, day, time_slot, class_name, subject)
            VALUES ($1, $2, $3, $4, $5)
          `, [teacherId, item.day, item.time_slot, item.class_name, item.subject]);
                }
            }
        });
        res.json({ message: 'Teacher schedule updated successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update teacher schedule' });
    }
};
exports.updateTeacherSchedule = updateTeacherSchedule;
