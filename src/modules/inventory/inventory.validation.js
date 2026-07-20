import { body } from 'express-validator';

export const adjustStockRules = [
    body('productId')
      .isUUID()
      .withMessage('productId harus UUID valid'),
    body('quantityChange')
       .isInt()
       .withMessage('quantityChange harus angka bulat'),
    body('type')
       .isIn(['in', 'out', 'adjustment'])
       .withMessage("type harus 'in', 'out', atau 'adjustment'"),
    body('note')
       .optional({ checkFalsy: true })
       .isString(),
];