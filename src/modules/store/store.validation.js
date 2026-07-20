import { body } from 'express-validator';

export const createStoreRules = [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Nama toko wajib diisi'),
    body('owner_name')
      .optional({ checkFalsy: true })
      .isString()
      .withMessage('Nama pemilik harus berupa teks'),
    body('phone')
      .optional({ checkFalsy: true })
      .isString()
      .withMessage('Nomor telepon harus berupa teks'),
    body('address')
      .optional({ checkFalsy: true })
      .isString()
      .withMessage('Alamat harus berupa teks'),
];


export const updateStoreRules = [
    body('name')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Nama toko tidak boleh kosong'),
    body('owner_name')
      .optional({ checkFalsy: true })
      .isString(),
    body('phone')
      .optional({ checkFalsy: true })
      .isString(),
    body('address')
      .optional({ checkFalsy: true })
      .isString(),
];