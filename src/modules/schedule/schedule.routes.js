import { Router } from 'express';
import * as scheduleController from './schedule.controller.js';
import { createScheduleRules, updateScheduleRules } from './schedule.validation.js';
import { validate } from '../../middlewares/validate.js';
import { protect, roleGuard } from '../../middlewares/authGuard.js';

const router = Router();

router.get('/calendar', protect, scheduleController.getCalendarView);
router.get('/', protect, scheduleController.getAll);
router.get('/:id', protect, scheduleController.getById);

router.post('/', protect, roleGuard('admin', 'owner', 'staff'), createScheduleRules, validate, scheduleController.create);

router.put('/:id', protect, roleGuard('admin', 'owner', 'staff'), updateScheduleRules, validate, scheduleController.update);

router.patch('/:id/mark-paid', protect, roleGuard('admin', 'owner', 'staff'), scheduleController.markAsPaid);

router.delete('/:id', protect, roleGuard('admin', 'owner'), scheduleController.remove);

export default router;