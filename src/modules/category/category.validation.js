import { body } from 'express-validator';

export const createCategoryRules = [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Nama kategori wajib diisi')
      .isLength({ max: 100 }),
    body('description')
      .optional({ checkFalsy: true })
      .isString(),
];

export const updateCategoryRules = [
    body('name')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Nama kategori tidak boleh kosong')
      .isLength({ max: 100 }),
    body('description')
      .optional({ checlFalsy: true })
      .isString(),
];