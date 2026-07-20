import { Router } from 'express';
import { sync, me } from './auth.controller.js';
import { verifyToken, protect } from '../../middlewares/authGuard.js';

const router = Router();

router.post('/sync', verifyToken, sync);
router.get('/me', protect, me);

export default router;