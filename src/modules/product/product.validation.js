import { body } from 'express-validator';

export const createProductRules = [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Nama produk wajib diisi'),
    body('category_id')
      .optional({ checkFalsy: true })
      .isUUID()
      .withMessage('category_id harus berupa UUID valid'),
    body('sku')
      .optional({ checkFalsy: true })
      .isString(),
    body('barcode')
      .optional({ checkFalsy: true })
      .isString(),
    body('unit')
      .optional({ checkFalsy: true })
      .isString(),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Stok Awal hafus angka bulat >= 0'),
    body('min_stock_threshold')
      .optional()
      .isInt({ min: 0 }),
];


export const updateProductRules = [
    body('name')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Nama produk tidak boleh kosong'),
    body('category_id')
      .optional({ checkFalsy: true })
      .isUUID(),
    body('price')
      .optional()
      .isFloat({ min: 0 }),
    body('cost_price')
      .optional()
      .isFloat({ min: 0 }),
    body('min_stock_threshold')
      .optional()
      .isInt({ min: 0 }),
];