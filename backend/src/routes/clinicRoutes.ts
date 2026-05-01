import { Router } from 'express';
import { getMedicine, logVisit, getVisits } from '../controllers/clinicController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/medicine', authorizeRoles('clinic-admin', 'super-admin'), getMedicine);
router.post('/visit', authorizeRoles('clinic-admin', 'super-admin'), logVisit);
router.get('/visits', authorizeRoles('clinic-admin', 'super-admin'), getVisits);

export default router;
