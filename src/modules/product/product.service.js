import ApiError from '../../utils/ApiError.js';
import { productRepository } from './product.repository.js';

async function getAll(query) {
  const page = Number(query.page) || 1;
  const limit = Math.min(Number(query.limit) || 20, 100);

  const { data, total } = await productRepository.findAll({
    categoryId: query.categoryId,
    search: query.search,
    page,
    limit,
  });

  return {
    items: data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function getById(id) {
  const product = await productRepository.findById(id);
  if (!product) throw new ApiError(404, 'Produk tidak ditemukan');
  return product;
}

async function getByBarcode(barcode) {
  const product = await productRepository.findByBarcode(barcode);
  if (!product) {
    throw new ApiError(404, `Produk dengan barcode "${barcode}" tidak ditemukan`);
  }
  if (!product.is_active) {
    throw new ApiError(409, `Produk "${product.name}" sudah tidak aktif dijual`);
  }
  return product;
}

async function create(payload) {
  if (payload.sku) {
    const existing = await productRepository.findBySku(payload.sku);
    if (existing) {
      throw new ApiError(409, `SKU "${payload.sku}" sudah digunakan produk lain`);
    }
  }
  return productRepository.create(payload);
}

async function update(id, payload) {
  await getById(id);
  return productRepository.update(id, payload);
}

async function remove(id) {
  await getById(id);
  return productRepository.update(id, { is_active: false });
}

export const productService = {
  getAll,
  getById,
  getByBarcode,
  create,
  update,
  remove,
};