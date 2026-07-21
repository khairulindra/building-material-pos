import { body } from 'express-validator';

export const createStoreCategoryRules = [
    body('name')
       .trim()
       .notEmpty()
       .withMessage('Nama kategori toko wajib diisi')
       .isLength({ max: 100 })
       .withMessage('Nama kategori toko maksimal 100 karakter'),
    body('description')
       .optional({ checkFalsy: true })
       .isString()
       .withMessage('Deskripsi harus berupa teks'),
];


export const updateStoreCategoryRules = [
    body('name')
       .optional()
       .trim()
       .notEmpty()
       .withMessage('Nama kategori toko tidak boleh kosong')
       .isLength({ max: 100 })
       .withMessage('Nama kategori toko maksimal 100 karakter'),
    body('description')
       .optional({ checkFalsy: true })
       .isString()
       .withMessage('Deskripsi harus berupa teks'),
];