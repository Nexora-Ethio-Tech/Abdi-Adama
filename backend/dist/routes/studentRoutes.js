import { Router } from 'express';
import { getStudents, getStudentById, createStudent } from '../controllers/studentController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
const router = Router();
// All student routes require authentication
router.use(authenticateToken);
// Restrict access to specific roles (excluding teachers as requested)
router.get('/', authorizeRoles('super-admin', 'school-admin', 'vice-principal', 'finance-clerk'), getStudents);
router.get('/:id', authorizeRoles('super-admin', 'school-admin', 'vice-principal', 'finance-clerk'), getStudentById);
router.post('/', authorizeRoles('super-admin', 'school-admin'), createStudent);
export default router;
