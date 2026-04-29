import { Router } from 'express';
import { getExams, getExamDetails, submitExam } from '../controllers/examController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = Router();
router.use(authenticateToken);
router.get('/', getExams);
router.get('/:id', getExamDetails);
router.post('/submit', submitExam);
export default router;
