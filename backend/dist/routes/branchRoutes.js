import { Router } from 'express';
import { getBranches, getBranchById } from '../controllers/branchController.js';
const router = Router();
router.get('/', getBranches);
router.get('/:id', getBranchById);
export default router;
