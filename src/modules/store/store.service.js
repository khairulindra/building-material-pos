import ApiError from '../../utils/ApiError.js';
import { storeRepository } from './store.repository.js';

async function getAll(query) {
  const page = Number(query.page) || 1;
  const limit = Math.min(Number(query.limit) || 20, 100);

  const { data, total } = await storeRepository.findAll({
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
  const store = await storeRepository.findById(id);
  if (!store) throw new ApiError(404, 'Toko tidak ditemukan');
  return store;
}

async function create(payload) {
  return storeRepository.create(payload);
}

async function update(id, payload) {
  await getById(id);
  return storeRepository.update(id, payload);
}

async function remove(id) {
  await getById(id);
  return storeRepository.remove(id);
}

export const storeService = { getAll, getById, create, update, remove };