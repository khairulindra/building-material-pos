import { Router } from 'express';
import * as reportController from './report.controller.js';
import { protect, roleGuard } from '../../middlewares/authGuard.js';

const router = Router();

router.get('/', protect, roleGuard('admin', 'owner'), reportController.getPerformanceReport);

export default router;