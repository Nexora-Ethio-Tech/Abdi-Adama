import { Router } from 'express';
import { getTransactions, getSummaries, createTransaction } from '../controllers/financeController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
const router = Router();
router.use(authenticateToken);
router.get('/transactions', authorizeRoles('super-admin', 'school-admin', 'finance-clerk'), getTransactions);
router.get('/summaries', authorizeRoles('super-admin', 'school-admin', 'finance-clerk'), getSummaries);
router.post('/transactions', authorizeRoles('super-admin', 'school-admin', 'finance-clerk'), createTransaction);
export default router;
