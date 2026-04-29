import { Router } from 'express';
import { login, register, getPendingUsers, updateStatus, verify } from '../controllers/authController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/verify', authenticateToken, verify);
// Admin-only routes for approval workflow
router.get('/pending-users', authenticateToken, authorizeRoles('super-admin', 'school-admin'), getPendingUsers);
router.patch('/update-status', authenticateToken, authorizeRoles('super-admin', 'school-admin'), updateStatus);
export default router;
