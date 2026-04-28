import { Router } from 'express';
import { getTeachers, createTeacher } from '../controllers/teacherController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', authorizeRoles('super-admin', 'school-admin', 'vice-principal'), getTeachers);
router.post('/', authorizeRoles('super-admin', 'school-admin'), createTeacher);

export default router;
