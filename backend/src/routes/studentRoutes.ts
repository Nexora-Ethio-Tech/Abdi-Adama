import { Router } from 'express';
import {
  getStudents, getStudentById, createStudent,
  updateStudentFees, approveFeeReduction, getSpecialStudents,
  getMyProfile, getStudentGrades, getStudentCommunicationLogs,
  getStudentHistory, getMyCourses, submitGradeEntry
} from '../controllers/studentController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

// ─── Self-service (Student / Parent) ──────────────────────────────────────────
router.get('/me', getMyProfile);
router.get('/me/history', getStudentHistory);
router.get('/me/courses', getMyCourses);

// ─── Admin / Staff ─────────────────────────────────────────────────────────────
router.get('/', authorizeRoles('super-admin', 'school-admin', 'vice-principal', 'finance-clerk', 'teacher'), getStudents);
router.post('/', authorizeRoles('super-admin', 'school-admin'), createStudent);
router.get('/special/list', authorizeRoles('super-admin', 'school-admin', 'finance-clerk', 'auditor'), getSpecialStudents);
router.put('/fees/update', authorizeRoles('super-admin', 'school-admin', 'finance-clerk'), updateStudentFees);
router.post('/fees/approve', authorizeRoles('super-admin', 'auditor', 'finance-clerk'), approveFeeReduction);
router.post('/grades', authorizeRoles('super-admin', 'school-admin', 'teacher', 'vice-principal'), submitGradeEntry);

// ─── Per-student data ──────────────────────────────────────────────────────────
router.get('/:id', authorizeRoles('super-admin', 'school-admin', 'vice-principal', 'finance-clerk', 'student', 'parent'), getStudentById);
router.get('/:id/grades', getStudentGrades);
router.get('/:id/communication-logs', getStudentCommunicationLogs);

export default router;
