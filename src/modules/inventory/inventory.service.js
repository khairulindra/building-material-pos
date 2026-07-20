import ApiError from '../../utils/ApiError.js';
import { inventoryRepository } from './inventory.repository.js';

async function adjustStock({ productId, quantityChange, type, note, userId }) {
    // 1. Validasi Input
    if (!['in', 'out', 'adjustment'].includes(type)) {
        throw new ApiError(400, "Type harus salah satu dari: 'in', 'out', 'adjustment'");
    }

    if (!Number.isInteger(quantityChange) || quantityChange === 0) {
        throw new ApiError(400, 'quantityChange harus angka bulat dan tidak boleh 0');
    }

    // 2. Cek apakah produk eksis
    const product = await inventoryRepository.getProductById(productId);
    if (!product) throw new ApiError(404, 'Produk tidak ditemukan');

    // 3. Hitung perubahan stok (negatif jika 'out', positif jika 'in'/'adjustment')
    const signedChange = type === 'out'
        ? -Math.abs(quantityChange)
        : Math.abs(quantityChange);

    const newStock = product.stock_quantity + signedChange;

    // 4. Validasi agar stok tidak minus
    if (newStock < 0) {
        throw new ApiError(409, `Stock tidak boleh negatif. Stok saat ini: ${product.stock_quantity}`);
    }

    // 5. PERBAIKAN UTAMA: Update stok produk di database melalui repository
    const updatedProduct = await inventoryRepository.updateStock(productId, newStock);

    // 6. Simpan riwayat ke log inventory
    const log = await inventoryRepository.insertLog({
        product_id: productId,
        change_type: type,
        quantity_change: signedChange,
        previous_stock: product.stock_quantity,
        new_stock: newStock,
        note: note || null,
        created_by: userId,
    });

    // 7. Kembalikan data produk yang sudah ter-update beserta log-nya
    return { product: updatedProduct, log };
}

async function getLogs(query) {
    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 20, 100);

    const { data, total } = await inventoryRepository.getLogs({
        productId: query.productId,
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

async function getLowStock() {
    return inventoryRepository.getLowStockProducts();
}

export const inventoryService = { adjustStock, getLogs, getLowStock };