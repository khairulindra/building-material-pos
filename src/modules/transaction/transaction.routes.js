import { Router } from 'express';
import * as transactionController from './transaction.controller.js';
import { checkoutRules } from './transaction.validation.js';
import {validate } from '../../middlewares/validate.js';
import { protect, roleGuard } from '../../middlewares/authGuard.js';

const router = Router();

router.post('/checkout', protect, roleGuard('admin', 'owner', 'staff', 'kasir'), checkoutRules, validate, transactionController.checkout);

router.get('/', protect, transactionController.getAll);
router.get('/:id', protect, transactionController.getById);
router.get('/:id/receipt', protect, transactionController.getReceipt);

export default router;