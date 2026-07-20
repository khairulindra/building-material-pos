import { body } from 'express-validator';

export const checkoutRules = [
    body('storeId')
       .optional({ checkFalsy: true })
       .isUUID()
       .withMessage('storeId harus UUID valid'),
    body('paymentMethod')
       .optional()
       .isIn(['cash', 'transfer', 'qris', 'tempo'])
       .withMessage("paymentMethod harus 'cash', 'transfer', 'qris', atau 'tempo'"),
    body('paymentStatus')
       .optional()
       .isIn(['paid', 'unpaid', 'partial'])
       .withMessage("paymentStatus harus 'paid', 'unpaid', atau 'partial'"),
    body('notes')
       .optional({ checkFalsy: true })
       .isString(),
    body('items')
       .isArray({ min: 1 })
       .withMessage('items harus berupa array dengan minimal 1 produk'),
    body('items.*.productId')
       .isUUID()
       .withMessage('Setiap item harus punya productId yang valid'),
    body('items.*.quantity')
       .isInt({ min: 1 })
       .withMessage('Setiap item harus punya quantity minimal 1'),
];