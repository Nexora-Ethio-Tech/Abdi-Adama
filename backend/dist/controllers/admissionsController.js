"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkSendExamNotification = exports.finalizeEnrollment = exports.confirmPayment = exports.markExamPassed = exports.reviewApplication = exports.getApplications = exports.submitApplication = exports.toggleRegistration = exports.getRegistrationConfig = void 0;
const dbClient_js_1 = require("../utils/dbClient.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
// ============================================================
// MODULE 2: ADMISSION PIPELINE & FINANCIAL INTEGRATION
// ============================================================
/**
 * Get registration config for branch
 */
const getRegistrationConfig = async (req, res) => {
    const user = req.user;
    try {
        const row = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query(`
        SELECT * FROM registration_config 
        WHERE branch_id = $1
      `, [user.branch_id]);
            return result.rows[0] || null;
        });
        res.json(row);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch registration config' });
    }
};
exports.getRegistrationConfig = getRegistrationConfig;
/**
 * Toggle registration open/close
 */
const toggleRegistration = async (req, res) => {
    const { is_open, start_date, end_date, admission_fee } = req.body;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            await client.query(`
        INSERT INTO registration_config (branch_id, is_open, start_date, end_date, admission_fee)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (branch_id) 
        DO UPDATE SET 
          is_open = $2, 
          start_date = $3, 
          end_date = $4, 
          admission_fee = $5,
          updated_at = NOW()
      `, [user.branch_id, is_open, start_date, end_date, admission_fee]);
        });
        res.json({ message: 'Registration config updated successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update registration config' });
    }
};
exports.toggleRegistration = toggleRegistration;
/**
 * Submit online application (public endpoint - no auth required)
 */
const submitApplication = async (req, res) => {
    const { name, dob, parent_name, phone, email, previous_school, last_grade, grade_applying, transcript_url, transcript_size_kb, branch_id } = req.body;
    try {
        // Validate file size (2MB = 2048 KB)
        if (transcript_size_kb && transcript_size_kb > 2048) {
            return res.status(400).json({ error: 'Transcript file exceeds 2MB limit' });
        }
        // Format phone number with Ethiopian prefix
        const formattedPhone = phone.startsWith('+251') ? phone : `+251${phone.replace(/^0+/, '')}`;
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Get admission fee from config
            const configResult = await client.query('SELECT admission_fee, is_open FROM registration_config WHERE branch_id = $1', [branch_id]);
            if (configResult.rows.length === 0 || !configResult.rows[0].is_open) {
                throw new Error('Registration is currently closed');
            }
            const admission_fee = configResult.rows[0].admission_fee;
            await client.query(`
        INSERT INTO pending_applications 
          (name, dob, parent_name, phone, email, previous_school, last_grade, 
           grade_applying, transcript_url, transcript_size_kb, date, status, branch_id, admission_fee)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_DATE, 'pending', $11, $12)
      `, [name, dob, parent_name, formattedPhone, email, previous_school, last_grade,
                grade_applying, transcript_url, transcript_size_kb, branch_id, admission_fee]);
        });
        res.status(201).json({ message: 'Application submitted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Failed to submit application' });
    }
};
exports.submitApplication = submitApplication;
/**
 * Get all applications (Admin view) - ordered by submission time
 */
const getApplications = async (req, res) => {
    const { status } = req.query;
    const user = req.user;
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            let query = `
        SELECT pa.*, 
               u.name as reviewed_by_name,
               fu.name as payment_confirmed_by_name
        FROM pending_applications pa
        LEFT JOIN users u ON pa.reviewed_by = u.id
        LEFT JOIN users fu ON pa.payment_confirmed_by = fu.id
        WHERE 1=1
      `;
            const params = [];
            // Branch filtering
            if (user.role !== 'super-admin') {
                params.push(user.branch_id);
                query += ` AND pa.branch_id = $${params.length}`;
            }
            if (status) {
                params.push(status);
                query += ` AND pa.status = $${params.length}`;
            }
            // Order by oldest first (FIFO)
            query += ` ORDER BY pa.created_at ASC`;
            const result = await client.query(query, params);
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};
exports.getApplications = getApplications;
/**
 * Review application - Pass/Exam/Decline
 */
const reviewApplication = async (req, res) => {
    const { applicationId } = req.params;
    const { action, exam_details } = req.body; // action: 'pass', 'exam', 'decline'
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Get application details
            const appResult = await client.query('SELECT * FROM pending_applications WHERE id = $1', [applicationId]);
            if (appResult.rows.length === 0) {
                throw new Error('Application not found');
            }
            const application = appResult.rows[0];
            let newStatus = '';
            let notificationMessage = '';
            if (action === 'pass') {
                newStatus = 'awaiting-payment';
                notificationMessage = `Congratulations! You are accepted. Please pay the admission fee of ${application.admission_fee} Birr to complete your enrollment.`;
            }
            else if (action === 'exam') {
                newStatus = 'exam-pending';
                notificationMessage = `Please check your email/phone for exam details. Admission fee of ${application.admission_fee} Birr applies.`;
                // Save exam details if provided
                if (exam_details) {
                    await client.query(`
            INSERT INTO registration_exam_config 
              (application_id, exam_date, exam_time, location, subjects, notes)
            VALUES ($1, $2, $3, $4, $5, $6)
          `, [
                        applicationId,
                        exam_details.exam_date,
                        exam_details.exam_time,
                        exam_details.location,
                        exam_details.subjects,
                        exam_details.notes
                    ]);
                }
            }
            else if (action === 'decline') {
                newStatus = 'declined';
                notificationMessage = 'We regret to inform you that your application was not accepted at this time.';
            }
            // Update application status
            await client.query(`
        UPDATE pending_applications 
        SET status = $1, reviewed_by = $2, reviewed_at = NOW(), updated_at = NOW()
        WHERE id = $3
      `, [newStatus, user.id, applicationId]);
            // TODO: Send notification via SMS/Email
            console.log(`Notification to ${application.phone}/${application.email}: ${notificationMessage}`);
        });
        res.json({ message: 'Application reviewed successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Failed to review application' });
    }
};
exports.reviewApplication = reviewApplication;
/**
 * Mark exam as passed (after exam)
 */
const markExamPassed = async (req, res) => {
    const { applicationId } = req.params;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            await client.query(`
        UPDATE pending_applications 
        SET status = 'awaiting-payment', updated_at = NOW()
        WHERE id = $1
      `, [applicationId]);
        });
        res.json({ message: 'Applicant marked as passed' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update application' });
    }
};
exports.markExamPassed = markExamPassed;
/**
 * Confirm payment (Finance Officer)
 */
const confirmPayment = async (req, res) => {
    const { applicationId } = req.params;
    const user = req.user;
    if (user.role !== 'finance-clerk' && user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            await client.query(`
        UPDATE pending_applications 
        SET status = 'payment-confirmed', 
            payment_confirmed_by = $1, 
            payment_confirmed_at = NOW(),
            updated_at = NOW()
        WHERE id = $2
      `, [user.id, applicationId]);
        });
        res.json({ message: 'Payment confirmed successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to confirm payment' });
    }
};
exports.confirmPayment = confirmPayment;
/**
 * Finalize enrollment - assign grade/section and create student account
 */
const finalizeEnrollment = async (req, res) => {
    const { applicationId } = req.params;
    const { section_id } = req.body;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        const studentId = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Get application details
            const appResult = await client.query('SELECT * FROM pending_applications WHERE id = $1 AND status = $2', [applicationId, 'payment-confirmed']);
            if (appResult.rows.length === 0) {
                throw new Error('Application not found or payment not confirmed');
            }
            const app = appResult.rows[0];
            // Get section details
            const sectionResult = await client.query(`
        SELECT s.*, g.grade_level 
        FROM academic_sections s
        JOIN academic_grades g ON s.grade_id = g.id
        WHERE s.id = $1
      `, [section_id]);
            if (sectionResult.rows.length === 0) {
                throw new Error('Section not found');
            }
            const section = sectionResult.rows[0];
            // Generate student ID
            const year = new Date().getFullYear();
            const countResult = await client.query(`SELECT COUNT(*) FROM users WHERE username LIKE $1`, [`STU/${year}/%`]);
            const sequence = parseInt(countResult.rows[0].count) + 1;
            const studentUsername = `STU/${year}/${sequence.toString().padStart(3, '0')}`;
            // Generate 6-digit password
            const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
            const hashedPassword = await bcrypt_1.default.hash(tempPassword, 10);
            // Create user account
            const userResult = await client.query(`
        INSERT INTO users (username, name, email, password_hash, role, branch_id, digital_id, status)
        VALUES ($1, $2, $3, $4, 'student', $5, $1, 'Approved')
        RETURNING id
      `, [studentUsername, app.name, app.email || `${studentUsername.replace(/\//g, '').toLowerCase()}@abdi-adama.com`,
                hashedPassword, app.branch_id]);
            const userId = userResult.rows[0].id;
            // Format phone with Ethiopian prefix
            const formattedPhone = app.phone.startsWith('+251') ? app.phone : `+251${app.phone.replace(/^0+/, '')}`;
            // Create student profile
            const studentResult = await client.query(`
        INSERT INTO students 
          (user_id, branch_id, grade, dob, parent_name, parent_phone, status)
        VALUES ($1, $2, $3, $4, $5, $6, 'Active')
        RETURNING id
      `, [userId, app.branch_id,
                `Grade ${section.grade_level} - ${section.section_name}`,
                app.dob, app.parent_name, formattedPhone]);
            const newStudentId = studentResult.rows[0].id;
            // Create parent account with same student ID
            const parentPassword = Math.floor(100000 + Math.random() * 900000).toString();
            const parentHashedPassword = await bcrypt_1.default.hash(parentPassword, 10);
            const parentUserResult = await client.query(`
        INSERT INTO users (username, name, email, password_hash, role, branch_id, digital_id, status)
        VALUES ($1, $2, $3, $4, 'parent', $5, $1, 'Approved')
        RETURNING id
      `, [studentUsername, app.parent_name,
                `parent.${studentUsername.replace(/\//g, '').toLowerCase()}@abdi-adama.com`,
                parentHashedPassword, app.branch_id]);
            const parentUserId = parentUserResult.rows[0].id;
            await client.query(`
        INSERT INTO parents (user_id, branch_id, linked_student_id)
        VALUES ($1, $2, $3)
      `, [parentUserId, app.branch_id, newStudentId]);
            await client.query(`
        INSERT INTO parent_student (parent_id, student_id)
        SELECT p.id, $1 FROM parents p WHERE p.user_id = $2
      `, [newStudentId, parentUserId]);
            // Log credentials
            await client.query(`
        INSERT INTO credential_logs (user_id, digital_id, initial_password, generated_by)
        VALUES ($1, $2, $3, $4), ($5, $6, $7, $8)
      `, [userId, studentUsername, tempPassword, user.id,
                parentUserId, studentUsername, parentPassword, user.id]);
            // Update section count
            await client.query(`
        UPDATE academic_sections 
        SET current_count = current_count + 1
        WHERE id = $1
      `, [section_id]);
            // Update application
            await client.query(`
        UPDATE pending_applications 
        SET status = 'approved', section_assigned = $1, updated_at = NOW()
        WHERE id = $2
      `, [section_id, applicationId]);
            return {
                studentId: newStudentId,
                studentUsername,
                studentPassword: tempPassword,
                parentPassword
            };
        });
        res.json({
            message: 'Enrollment finalized successfully',
            credentials: studentId
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Failed to finalize enrollment' });
    }
};
exports.finalizeEnrollment = finalizeEnrollment;
/**
 * Bulk send exam notification
 */
const bulkSendExamNotification = async (req, res) => {
    const { application_ids, message_type, subject, message } = req.body;
    const user = req.user;
    if (user.role !== 'school-admin' && user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // Get applicants
            const applicantsResult = await client.query(`
        SELECT id, phone, email, name 
        FROM pending_applications 
        WHERE id = ANY($1)
      `, [application_ids]);
            const recipients = applicantsResult.rows;
            // Log bulk communication
            const commResult = await client.query(`
        INSERT INTO bulk_communications 
          (sent_by, recipient_count, message_type, subject, message, application_ids)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `, [user.id, recipients.length, message_type, subject, message, application_ids]);
            const commId = commResult.rows[0].id;
            // Log recipients
            for (const recipient of recipients) {
                await client.query(`
          INSERT INTO bulk_communication_recipients 
            (communication_id, application_id, phone, email, status)
          VALUES ($1, $2, $3, $4, 'sent')
        `, [commId, recipient.id, recipient.phone, recipient.email]);
                // TODO: Actually send SMS/Email here
                console.log(`Sending ${message_type} to ${recipient.name}: ${message}`);
            }
        });
        res.json({ message: `Notification sent to ${application_ids.length} applicants` });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send bulk notification' });
    }
};
exports.bulkSendExamNotification = bulkSendExamNotification;
