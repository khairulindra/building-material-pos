import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import { productService } from './product.service.js';

export const getAll = asyncHandler(async (req, res) => {
  const result = await productService.getAll(req.query);
  res.status(200).json(new ApiResponse(200, 'Berhasil mengambil daftar produk', result));
});

export const getById = asyncHandler(async (req, res) => {
  const data = await productService.getById(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Berhasil mengambil detail produk', data));
});

export const getByBarcode = asyncHandler(async (req, res) => {
  const data = await productService.getByBarcode(req.params.barcode);
  res.status(200).json(new ApiResponse(200, 'Produk ditemukan', data));
});

export const create = asyncHandler(async (req, res) => {
  const data = await productService.create(req.body);
  res.status(201).json(new ApiResponse(201, 'Produk berhasil ditambahkan', data));
});

export const update = asyncHandler(async (req, res) => {
  const data = await productService.update(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, 'Produk berhasil diperbarui', data));
});

export const remove = asyncHandler(async (req, res) => {
  await productService.remove(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Produk berhasil dinonaktifkan'));
});