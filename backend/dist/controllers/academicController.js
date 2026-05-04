"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentsBySection = exports.deleteSection = exports.updateSection = exports.bulkCreateSections = exports.createSection = exports.getGradesWithSections = exports.getSectionsByGrade = exports.createGrade = exports.getGrades = void 0;
const dbClient_js_1 = require("../utils/dbClient.js");
// ============================================================
// MODULE 1: DYNAMIC ACADEMIC STRUCTURE
// ============================================================
/**
 * Get all grades (Admin-managed)
 */
const getGrades = async (req, res) => {
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query(`
        SELECT * FROM academic_grades 
        WHERE is_active = TRUE 
        ORDER BY 
          CASE 
            WHEN grade_level ~ '^[0-9]+$' THEN grade_level::INTEGER 
            ELSE 999 
          END
      `);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch grades' });
    }
};
exports.getGrades = getGrades;
/**
 * Create a new grade
 */
const createGrade = async (req, res) => {
    const { grade_level, branch_id } = req.body;
    const user = req.user;
    // Only school-admin can create grades
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            await client.query(`INSERT INTO academic_grades (grade_level, branch_id, is_active) 
         VALUES ($1, $2, TRUE)`, [grade_level, branch_id || user.branch_id]);
        });
        res.status(201).json({ message: 'Grade created successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create grade' });
    }
};
exports.createGrade = createGrade;
/**
 * Get sections for a specific grade
 */
const getSectionsByGrade = async (req, res) => {
    const { gradeId } = req.params;
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query(`
        SELECT s.*, t.id as teacher_id, u.name as room_teacher_name
        FROM academic_sections s
        LEFT JOIN teachers t ON s.room_teacher_id = t.id
        LEFT JOIN users u ON t.user_id = u.id
        WHERE s.grade_id = $1 AND s.is_active = TRUE
        ORDER BY s.section_name ASC
      `, [gradeId]);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch sections' });
    }
};
exports.getSectionsByGrade = getSectionsByGrade;
/**
 * Get all grades with their sections (for dropdown in registration)
 */
const getGradesWithSections = async (req, res) => {
    const user = req.user;
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            let query = `
        SELECT 
          g.id as grade_id,
          g.grade_level,
          json_agg(
            json_build_object(
              'id', s.id,
              'section_name', s.section_name,
              'capacity', s.capacity,
              'current_count', s.current_count,
              'available', (s.capacity - s.current_count)
            ) ORDER BY s.section_name
          ) FILTER (WHERE s.id IS NOT NULL) as sections
        FROM academic_grades g
        LEFT JOIN academic_sections s ON g.id = s.grade_id AND s.is_active = TRUE
        WHERE g.is_active = TRUE
      `;
            const params = [];
            // Branch filtering for non-super-admins
            if (user.role !== 'super-admin') {
                params.push(user.branch_id);
                query += ` AND (g.branch_id = $1 OR g.branch_id IS NULL)`;
            }
            query += ` GROUP BY g.id, g.grade_level ORDER BY 
        CASE 
          WHEN g.grade_level ~ '^[0-9]+$' THEN g.grade_level::INTEGER 
          ELSE 999 
        END`;
            const result = await client.query(query, params);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch grades with sections' });
    }
};
exports.getGradesWithSections = getGradesWithSections;
/**
 * Create sections for a grade
 */
const createSection = async (req, res) => {
    const { grade_id, section_name, capacity, branch_id } = req.body;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            await client.query(`INSERT INTO academic_sections (grade_id, section_name, capacity, branch_id, current_count) 
         VALUES ($1, $2, $3, $4, 0)`, [grade_id, section_name, capacity || 40, branch_id || user.branch_id]);
        });
        res.status(201).json({ message: 'Section created successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create section' });
    }
};
exports.createSection = createSection;
/**
 * Bulk create sections for a grade
 */
const bulkCreateSections = async (req, res) => {
    const { grade_id, section_count, capacity, branch_id } = req.body;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const sections = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, section_count);
            for (const section of sections) {
                await client.query(`INSERT INTO academic_sections (grade_id, section_name, capacity, branch_id, current_count) 
           VALUES ($1, $2, $3, $4, 0)
           ON CONFLICT (grade_id, section_name) DO NOTHING`, [grade_id, section, capacity || 40, branch_id || user.branch_id]);
            }
        });
        res.status(201).json({ message: `${section_count} sections created successfully` });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create sections' });
    }
};
exports.bulkCreateSections = bulkCreateSections;
/**
 * Update section capacity
 */
const updateSection = async (req, res) => {
    const { sectionId } = req.params;
    const { capacity, room_teacher_id } = req.body;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            await client.query(`UPDATE academic_sections 
         SET capacity = COALESCE($1, capacity),
             room_teacher_id = COALESCE($2, room_teacher_id),
             updated_at = NOW()
         WHERE id = $3`, [capacity, room_teacher_id, sectionId]);
        });
        res.json({ message: 'Section updated successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update section' });
    }
};
exports.updateSection = updateSection;
/**
 * Delete section
 */
const deleteSection = async (req, res) => {
    const { sectionId } = req.params;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Soft delete
            await client.query(`UPDATE academic_sections SET is_active = FALSE, updated_at = NOW() WHERE id = $1`, [sectionId]);
        });
        res.json({ message: 'Section deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete section' });
    }
};
exports.deleteSection = deleteSection;
/**
 * Get students by section (sorted alphabetically)
 */
const getStudentsBySection = async (req, res) => {
    const { sectionId } = req.params;
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query(`
        SELECT s.*, u.name, u.email, u.digital_id
        FROM students s
        JOIN users u ON s.user_id = u.id
        WHERE s.grade IN (
          SELECT CONCAT('Grade ', ag.grade_level, ' - ', acs.section_name)
          FROM academic_sections acs
          JOIN academic_grades ag ON acs.grade_id = ag.id
          WHERE acs.id = $1
        )
        ORDER BY u.name ASC
      `, [sectionId]);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};
exports.getStudentsBySection = getStudentsBySection;
