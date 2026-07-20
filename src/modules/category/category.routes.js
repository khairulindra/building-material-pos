import { Router } from 'express';
import * as categoryController from './category.controller.js';
import { createCategoryRules, updateCategoryRules } from './category.validation.js';
import { validate } from '../../middlewares/validate.js';
import { protect, roleGuard } from '../../middlewares/authGuard.js';

const router = Router();

router.get('/', protect, categoryController.getAll);
router.get('/:id', protect, categoryController.getById);

router.post('/', protect, roleGuard('admin', 'owner'), createCategoryRules, validate, categoryController.create);
router.put('/:id', protect, roleGuard('admin', 'owner'), updateCategoryRules, validate, categoryController.update);
router.delete('/:id', protect, roleGuard('admin', 'owner'), categoryController.remove);

export default router;