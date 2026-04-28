import { Router } from 'express';
import { getStudents, getStudentById, createStudent } from '../controllers/studentController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

// All student routes require authentication
router.use(authenticateToken);

router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', authorizeRoles('super-admin', 'school-admin'), createStudent);


export default router;
