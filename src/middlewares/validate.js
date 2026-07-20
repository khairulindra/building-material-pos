import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formatted = errors.array().map((e) => ({ field: e.path, message: e.msg }));
        throw new ApiError(422, 'Validasi input gagal', formatted);
    }
    next();
};