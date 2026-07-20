import { Router } from 'express';
import * as storeController from './store.controller.js';
import { createStoreRules, updateStoreRules } from './store.validation.js';
import { validate } from '../../middlewares/validate.js';
import { protect, roleGuard } from '../../middlewares/authGuard.js';

const router = Router();

router.get('/', protect, storeController.getAll);
router.get('/:id', protect, storeController.getById);


router.post('/', protect, roleGuard('admin', 'owner', 'staff'), createStoreRules, validate, storeController.create);
router.put('/:id', protect, roleGuard('admin', 'owner', 'staff'), updateStoreRules, validate, storeController.update);
router.delete('/:id', protect, roleGuard('admin', 'owner'), storeController.remove);

export default router;