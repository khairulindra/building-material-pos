import { Router } from 'express';
import * as inventoryController from './inventory.controller.js';
import { adjustStockRules } from './inventory.validation.js';
import { validate } from '../../middlewares/validate.js';
import { protect, roleGuard } from '../../middlewares/authGuard.js';

const router = Router();

router.get('/logs', protect, inventoryController.getLogs);
router.get('/low-stock', protect, inventoryController.getLowStock);

router.post(
  '/adjust',
  protect,
  roleGuard('admin', 'owner', 'staff'),
  adjustStockRules,
  validate,
  inventoryController.adjustStock
);

export default router;