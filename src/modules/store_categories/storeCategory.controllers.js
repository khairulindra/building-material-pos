import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import * as storeCategoryService from './storeCategory.service.js';

export const getAll = asyncHandler(async (req, res) => {
  const categories = await storeCategoryService.getAll();

  return res.status(200).json(
    new ApiResponse(200, categories, 'Berhasil mengambil daftar kategori toko')
  );
});

export const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await storeCategoryService.getById(id);

  return res.status(200).json(
    new ApiResponse(200, category, 'Berhasil mengambil detail kategori toko')
  );
});

export const create = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const newCategory = await storeCategoryService.create({ name, description });

  return res.status(201).json(
    new ApiResponse(201, newCategory, 'Kategori toko berhasil ditambahkan')
  );
});

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatedCategory = await storeCategoryService.update(id, { name, description });

  return res.status(200).json(
    new ApiResponse(200, updatedCategory, 'Kategori toko berhasil diperbarui')
  );
});

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await storeCategoryService.remove(id);

  return res.status(200).json(
    new ApiResponse(200, null, 'Kategori toko berhasil dihapus')
  );
});