import { Router } from 'express';
import { markAttendance, getNotices, getLogisticsNotices } from '../controllers/operationalController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = Router();
router.use(authenticateToken);
router.post('/attendance', markAttendance);
router.get('/notices', getNotices);
router.get('/logistics', getLogisticsNotices);
export default router;
