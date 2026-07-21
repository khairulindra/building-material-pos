import { Router } from 'express';
import * as storeCategoryController from './storeCategory.controllers.js';
import { createStoreCategoryRules, updateStoreCategoryRules } from './storeCategory.validation.js';
import { validate } from '../../middlewares/validate.js';
import { protect, roleGuard } from '../../middlewares/authGuard.js';

const router = Router();

router.get('/', protect, storeCategoryController.getAll);
router.get('/:id', protect, storeCategoryController.getById);

router.post('/', protect, roleGuard('admin', 'owner'), createStoreCategoryRules, validate, storeCategoryController.create);
router.put('/:id', protect, roleGuard('admin', 'owner'), updateStoreCategoryRules, validate, storeCategoryController.update);
router.delete('/:id', protect, roleGuard('admin', 'owner'), storeCategoryController.remove);

export default router;