import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getRegistrationConfig, toggleRegistration, submitApplication, getApplications, reviewApplication, markExamPassed, confirmPayment, finalizeEnrollment, bulkSendExamNotification } from '../controllers/admissionsController.js';
import { uploadTranscript } from '../middleware/uploadMiddleware.js';
const router = Router();
// Public endpoint - no auth required
router.post('/apply', uploadTranscript.single('transcript'), submitApplication);
// All other routes require authentication
router.use(authenticateToken);
// Registration config
router.get('/config', getRegistrationConfig);
router.post('/config/toggle', toggleRegistration);
// Applications
router.get('/applications', getApplications);
router.post('/applications/:applicationId/review', reviewApplication);
router.post('/applications/:applicationId/exam-passed', markExamPassed);
router.post('/applications/:applicationId/confirm-payment', confirmPayment);
router.post('/applications/:applicationId/finalize', finalizeEnrollment);
// Bulk communication
router.post('/bulk-notification', bulkSendExamNotification);
export default router;
