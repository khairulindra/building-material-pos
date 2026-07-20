import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import { categoryService } from './category.service.js';

export const getAll = asyncHandler(async (req, res) => {
    const data = await categoryService.getAll();
    res.status(200).json(new ApiResponse(200, 'Berhasil mengambil daftar kategori', data));
});


export const getById = asyncHandler(async (req, res) => {
    const data = await categoryService.getById(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Berhasil mengambil detail kategori', data));
});


export const create = asyncHandler(async (req, res) => {
    const data = await categoryService.create(req.body);
    res.status(201).json(new ApiResponse(201, 'Kategori berhasil dibuat', data));
});


export const update = asyncHandler(async (req, res) => {
    const data = await categoryService.update(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, 'Kategori berhasil diperbaraui', data));
});


export const remove = asyncHandler(async (req, res) => {
    await categoryService.remove(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Kategori berhasil dihapus'));
});

