import { body } from 'express-validator';

export const createScheduleRules = [
    body('store_id')
       .isUUID()
       .withMessage('store_id harus UUID valid'),
    body('amount')
       .isFloat({ min: 0 })
       .withMessage('Jumlah tagihan harus angka >= 0'),
    body('due_date')
       .isISO8601()
       .withMessage('due_date harus format tanggal valid (YYYY-MM-DD)'),,
    body('transaction_id')
       .optional({ checkFalsy: true })
       .isUUID()
       .withMessage('transaction_id harus UUID valid'),
    body('notes')
       .optional({ checkFalsy: true })
       .isString(),
];


export const updateScheduleRules = [
    body('amount')
       .optional()
       .isFloat({ min: 0 })
       .withMessage('Jumlah tagihan harus angka >= 0'),
    body('due_date')
       .optional()
       .isISO8601()
       .withMessage('due_date harus format tanggal valid (YYYY-MM-DD'),
    body('status')
       .optional()
       .isIn(['pending', 'paid', 'overdue'])
       .withMessage("status harus 'pending', 'paid', atau 'overdue'"),
];