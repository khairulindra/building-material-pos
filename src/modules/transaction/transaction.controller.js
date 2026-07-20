import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import { transactionService } from './transaction.service.js';

export const checkout = asyncHandler(async (req, res) => {
    const data = await transactionService.checkout(req.body, req.user.id);
    res.status(201).json(new ApiResponse(201, 'Transaksi berhasil diproses', data));
});


export const getAll = asyncHandler(async (req, res) => {
    const result = await transactionService.getAll(req.query);
    res.status(200).json(new ApiResponse(200, 'Berhasil mengambil daftar transaksi', result));
});


export const getById = asyncHandler(async (req, res) => {
    const data = await transactionService.getById(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Berhasil mengambil detail transaksi', data));
});


export const getReceipt = asyncHandler (async (req, res) => {
    const data = await transactionService.getReceipt(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Berhasil mengambil data struk', data));
});