import ApiError from '../../utils/ApiError.js';
import { categoryRepository } from './category.repository.js';

async function getAll() {
    return categoryRepository.findAll();
}

async function getById(id) {
    const category = await categoryRepository.findById(id);
    if (!category) throw new ApiError(404, 'Kategori Tidak Ditemukan');
    return category;
}

async function create(payload) {
    return categoryRepository.create(payload)
}

async function update(id, payload) {
    await getById(id);
    return categoryRepository.update(id, payload);
}

async function remove(id) {
    await getById(id);

    const productCount = await categoryRepository.countProductsByCategory(id);
    if (productCount > 0) {
        throw new ApiError (409, `Kategori tidak bisa dihapus karena masih digunakan oleh ${productCount} produk. Pindahkan produk ke kategori lain terlebih dahulu.`);
    } return categoryRepository.remove(id);
}

export const categoryService = { getAll, getById, create, update, remove };
