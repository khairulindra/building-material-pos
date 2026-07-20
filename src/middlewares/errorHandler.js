import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Terjadi kesalahan pada server';

    if (statusCode >= 500) {
        logger.error(`${req.method} ${req.originalUrl} ->`, err);
    } else {
        logger.warn(`${req.method} ${req.orginalUrl} -> [${statusCode}] ${message}`);
    }

    res.status(statusCode).json({
        success: false,
        message,
        details: err.details || undefined,
    });
};

export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`,
    });
};