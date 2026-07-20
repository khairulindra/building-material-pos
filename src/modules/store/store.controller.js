import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import { storeService } from './store.service.js';

export const getAll = asyncHandler(async (req, res) => {
    const data = await storeService.getAll(req.query); 
    res.status(200).json(new ApiResponse(200, 'Berhasil mengambil daftar toko', data));
});


export const getById = asyncHandler(async (req, res) => {
    const data = await storeService.getById(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Berhasil mengambil detail toko', data));
});


export const create = asyncHandler(async (req, res) => {
    const data = await storeService.create(req.body);
    res.status(201).json(new ApiResponse(201, 'Toko berhasil ditambahkan', data));
});


export const update = asyncHandler(async (req, res) => {
    const data = await storeService.update(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, 'Toko berhasil diperbarui', data));
});


export const remove = asyncHandler(async (req, res) => {
    await storeService.remove(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Toko berhasil dinonaktifkan'));
});
