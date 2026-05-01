import { Router } from 'express';
import { getRoutes, assignStudent, getManifest } from '../controllers/transportController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/routes', authorizeRoles('driver', 'super-admin', 'school-admin'), getRoutes);
router.post('/assign', authorizeRoles('school-admin', 'super-admin'), assignStudent);
router.get('/manifest', authorizeRoles('driver', 'super-admin'), getManifest);

export default router;
