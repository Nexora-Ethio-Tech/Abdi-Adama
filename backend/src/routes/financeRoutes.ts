import { Router } from 'express';
import { getTransactions, getSummaries, createTransaction, getFinanceSummary } from '../controllers/financeController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/summary', authorizeRoles('super-admin', 'school-admin', 'finance-clerk', 'auditor'), getFinanceSummary);
router.get('/transactions', authorizeRoles('super-admin', 'school-admin', 'finance-clerk', 'auditor'), getTransactions);
router.get('/summaries', authorizeRoles('super-admin', 'school-admin', 'finance-clerk', 'auditor'), getSummaries);
router.post('/transactions', authorizeRoles('super-admin', 'school-admin', 'finance-clerk'), createTransaction);

export default router;
