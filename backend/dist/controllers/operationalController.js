import { withRLS } from '../utils/dbClient.js';
// ─── DASHBOARD STATS ─────────────────────────────────────────
export const getDashboardStats = async (req, res) => {
    try {
        const stats = await withRLS(req, async (client) => {
            const result = await client.query(`
        SELECT
          (SELECT COUNT(*) FROM students s
           JOIN users u ON s.user_id = u.id
           WHERE u.status = 'Approved') as total_students,
          (SELECT COUNT(*) FROM teachers) as total_teachers,
          (SELECT COALESCE(SUM(amount), 0) FROM payments
           WHERE status = 'Paid'
           AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', NOW())) as monthly_revenue,
          (SELECT COALESCE(ROUND(
            AVG(CASE WHEN status = 'Present' THEN 100.0 ELSE 0.0 END), 1
          ), 0)
           FROM student_attendance WHERE date = CURRENT_DATE) as attendance_rate,
          (SELECT COUNT(*) FROM applications WHERE status = 'Pending') as pending_applications,
          (SELECT COUNT(*) FROM watchlist) as at_risk_students
      `);
            return result.rows[0];
        });
        res.json(stats);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};
// ─── WATCHLIST ───────────────────────────────────────────────
export const getWatchlist = async (req, res) => {
    try {
        const rows = await withRLS(req, async (client) => {
            const result = await client.query(`
        SELECT w.*, u.name, u.digital_id, s.grade,
               ag.grade_level, acs.section_name
        FROM watchlist w
        JOIN students s ON w.student_id = s.id
        JOIN users u ON s.user_id = u.id
        LEFT JOIN academic_sections acs ON s.section_id = acs.id
        LEFT JOIN academic_grades ag ON acs.grade_id = ag.id
        ORDER BY w.average_score ASC
        LIMIT 20
      `);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch watchlist' });
    }
};
// ─── EVENTS / NOTICE BOARD ───────────────────────────────────
export const getEvents = async (req, res) => {
    try {
        const rows = await withRLS(req, async (client) => {
            const result = await client.query(`
        SELECT * FROM events
        WHERE event_date >= CURRENT_DATE
        ORDER BY event_date ASC
        LIMIT 20
      `);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};
export const createEvent = async (req, res) => {
    const { title, event_date, type, expiry_date } = req.body;
    const user = req.user;
    try {
        await withRLS(req, async (client) => {
            await client.query(`INSERT INTO events (title, event_date, type, branch_id, expiry_date)
         VALUES ($1, $2, $3, $4, $5)`, [title, event_date, type || 'Event', user.branch_id, expiry_date || event_date]);
        });
        res.status(201).json({ message: 'Event created successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create event' });
    }
};
export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await withRLS(req, async (client) => {
            await client.query('DELETE FROM events WHERE id = $1', [id]);
        });
        res.json({ message: 'Event deleted' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};
// ─── INVENTORY ───────────────────────────────────────────────
export const getInventory = async (req, res) => {
    const user = req.user;
    try {
        const rows = await withRLS(req, async (client) => {
            const result = await client.query(`
        SELECT * FROM inventory
        WHERE (branch_id = $1 OR branch_id IS NULL OR $2 = true)
        ORDER BY category, name ASC
      `, [user.branch_id, user.role === 'super-admin']);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
};
export const createInventoryItem = async (req, res) => {
    const { name, category, quantity, condition, location } = req.body;
    const user = req.user;
    try {
        await withRLS(req, async (client) => {
            await client.query(`INSERT INTO inventory (name, category, quantity, condition, location, branch_id)
         VALUES ($1, $2, $3, $4, $5, $6)`, [name, category, quantity || 0, condition || 'Good', location, user.branch_id]);
        });
        res.status(201).json({ message: 'Item added successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add inventory item' });
    }
};
export const updateInventoryItem = async (req, res) => {
    const { id } = req.params;
    const { name, category, quantity, condition, location } = req.body;
    try {
        await withRLS(req, async (client) => {
            await client.query(`UPDATE inventory SET name=$1, category=$2, quantity=$3, condition=$4, location=$5, updated_at=NOW()
         WHERE id=$6`, [name, category, quantity, condition, location, id]);
        });
        res.json({ message: 'Item updated' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update item' });
    }
};
export const deleteInventoryItem = async (req, res) => {
    const { id } = req.params;
    try {
        await withRLS(req, async (client) => {
            await client.query('DELETE FROM inventory WHERE id = $1', [id]);
        });
        res.json({ message: 'Item deleted' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete item' });
    }
};
// ─── SCHEDULES ───────────────────────────────────────────────
export const getSchedule = async (req, res) => {
    const { teacher_id } = req.query;
    const user = req.user;
    const targetTeacherId = teacher_id || null;
    try {
        const rows = await withRLS(req, async (client) => {
            let query = `
        SELECT sc.*, u.name as teacher_name, 
               ag.grade_level, acs.section_name,
               CONCAT('Grade ', ag.grade_level, ' - Section ', acs.section_name) as class_name
        FROM schedules sc
        JOIN teachers t ON sc.teacher_id = t.id
        JOIN users u ON t.user_id = u.id
        LEFT JOIN academic_sections acs ON sc.section_id = acs.id
        LEFT JOIN academic_grades ag ON acs.grade_id = ag.id
        WHERE 1=1
      `;
            const params = [];
            if (targetTeacherId) {
                params.push(targetTeacherId);
                query += ` AND sc.teacher_id = $${params.length}`;
            }
            else if (user.role === 'teacher') {
                params.push(user.id);
                query += ` AND t.user_id = $${params.length}`;
            }
            query += ` ORDER BY CASE sc.day 
        WHEN 'Monday' THEN 1 WHEN 'Tuesday' THEN 2 WHEN 'Wednesday' THEN 3
        WHEN 'Thursday' THEN 4 WHEN 'Friday' THEN 5 ELSE 6 END, sc.time_slot`;
            const result = await client.query(query, params);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch schedule' });
    }
};
export const saveSchedule = async (req, res) => {
    // entries: [{ teacher_id, section_id, subject, day, time_slot }]
    const { teacher_id, entries } = req.body;
    const user = req.user;
    try {
        await withRLS(req, async (client) => {
            // PURGE old schedule for this teacher first
            await client.query('DELETE FROM schedules WHERE teacher_id = $1', [teacher_id]);
            // Insert fresh
            for (const entry of entries) {
                await client.query(`INSERT INTO schedules (teacher_id, section_id, subject, day, time_slot, branch_id)
           VALUES ($1, $2, $3, $4, $5, $6)`, [teacher_id, entry.section_id, entry.subject, entry.day, entry.time_slot, user.branch_id]);
            }
        });
        res.json({ message: 'Schedule saved successfully (old data purged)' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save schedule' });
    }
};
// ─── GRADING CONFIG ──────────────────────────────────────────
export const getGradingConfig = async (req, res) => {
    const { grade_level } = req.query;
    try {
        const rows = await withRLS(req, async (client) => {
            const result = await client.query(`
        SELECT * FROM grading_configs
        WHERE grade_level = COALESCE($1, 'default')
        ORDER BY max_weight DESC
      `, [grade_level || 'default']);
            // Fallback to default if no grade-specific config found
            if (result.rows.length === 0) {
                const fallback = await client.query(`
          SELECT * FROM grading_configs WHERE grade_level = 'default' ORDER BY max_weight DESC
        `);
                return fallback.rows;
            }
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch grading config' });
    }
};
export const upsertGradingConfig = async (req, res) => {
    const { grade_level, configs } = req.body;
    // configs: [{ score_type, label, max_weight }]
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await withRLS(req, async (client) => {
            for (const cfg of configs) {
                await client.query(`
          INSERT INTO grading_configs (grade_level, score_type, label, max_weight, branch_id)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (grade_level, score_type, branch_id) DO UPDATE
            SET label = $3, max_weight = $4
        `, [grade_level || 'default', cfg.score_type, cfg.label, cfg.max_weight, user.branch_id]);
            }
        });
        res.json({ message: 'Grading config saved' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save grading config' });
    }
};
// ─── ATTENDANCE ──────────────────────────────────────────────
export const markAttendance = async (req, res) => {
    const { student_id, date, status } = req.body;
    const user = req.user;
    try {
        await withRLS(req, async (client) => {
            await client.query(`INSERT INTO student_attendance (student_id, date, status, recorded_by)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (student_id, date) DO UPDATE SET status = $3, recorded_by = $4`, [student_id, date, status, user.id]);
        });
        res.json({ message: 'Attendance recorded successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to record attendance' });
    }
};
export const bulkMarkAttendance = async (req, res) => {
    const { date, attendance } = req.body;
    const user = req.user;
    try {
        await withRLS(req, async (client) => {
            for (const [studentId, status] of Object.entries(attendance)) {
                await client.query(`INSERT INTO student_attendance (student_id, date, status, recorded_by)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (student_id, date) DO UPDATE SET status = $3, recorded_by = $4`, [studentId, date, status, user.id]);
            }
        });
        res.json({ message: 'Bulk attendance recorded successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to record bulk attendance' });
    }
};
export const getAttendanceBySection = async (req, res) => {
    const { sectionId, date } = req.query;
    try {
        const rows = await withRLS(req, async (client) => {
            const result = await client.query(`
        SELECT sa.*, u.name as student_name, u.digital_id
        FROM student_attendance sa
        JOIN students s ON sa.student_id = s.id
        JOIN users u ON s.user_id = u.id
        WHERE sa.date = $1 AND s.section_id = $2
        ORDER BY u.name ASC
      `, [date, sectionId]);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch attendance' });
    }
};
// ─── NOTICES ─────────────────────────────────────────────────
export const getNotices = async (req, res) => {
    const { branch_id } = req.query;
    try {
        const rows = await withRLS(req, async (client) => {
            let query = 'SELECT * FROM notices';
            const params = [];
            if (branch_id) {
                query += ' WHERE branch_id = $1';
                params.push(branch_id);
            }
            query += ' ORDER BY created_at DESC';
            const result = await client.query(query, params);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch notices' });
    }
};
export const getLogisticsNotices = async (req, res) => {
    try {
        const rows = await withRLS(req, async (client) => {
            const result = await client.query('SELECT * FROM logistics_notices ORDER BY created_at DESC');
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch logistics notices' });
    }
};
// ─── WEEKLY PLANS ────────────────────────────────────────────
export const createWeeklyPlan = async (req, res) => {
    const plan = req.body;
    const user = req.user;
    try {
        await withRLS(req, async (client) => {
            await client.query(`INSERT INTO weekly_plans (
          teacher_id, date, content, objectives, teacher_activity,
          student_activity, time_duration, teaching_method, teaching_aids,
          evaluation, remark, status
        ) VALUES (
          (SELECT id FROM teachers WHERE user_id = $1), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        )`, [
                user.id, plan.date, plan.content, plan.objectives, plan.teacherActivity,
                plan.studentActivity, plan.time, plan.teachingMethod, plan.teachingAids,
                plan.evaluation, plan.remark, plan.status || 'Pending'
            ]);
        });
        res.json({ message: 'Weekly plan created successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create weekly plan' });
    }
};
export const getWeeklyPlans = async (req, res) => {
    const user = req.user;
    try {
        const rows = await withRLS(req, async (client) => {
            const result = await client.query(`
        SELECT * FROM weekly_plans
        WHERE teacher_id = (SELECT id FROM teachers WHERE user_id = $1)
        ORDER BY date DESC
      `, [user.id]);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch weekly plans' });
    }
};
