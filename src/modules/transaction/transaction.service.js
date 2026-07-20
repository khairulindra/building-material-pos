import ApiError from '../../utils/ApiError.js';
import { transactionRepository } from './transaction.repository.js';

async function checkout({ storeId, paymentMethod, paymentStatus, notes, items }, cashierId) {
    if (!Array.isArray(items) || items.length === 0) {
        throw new ApiError(400, 'Transaksi harus memiliki minimal 1 item produk');
    }

    const normalizedItems = items.map((it) => {
        if (!it.productId || !it.quantity || it.quantity <= 0) {
            throw new ApiError(400, 'Setiap item harus punya productId dan quantity > 0');
        }
        return {
            product_id: it.productId,
            quantity: it.quantity,
        };
    });

    try {
        const result = await transactionRepository.createPosTransaction({
            storeId,
            cashierId,
            paymentMethod: paymentMethod || 'cash',
            paymentStatus: paymentStatus || 'paid',
            notes,
            items: normalizedItems,
        });
        return result;
    } catch (err) {
        throw new ApiError(409, err.message || 'Gagal  memproses transaksi');
    }
}

async function getAll(query) {
    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 20, 100);

    const { data, total } = await transactionRepository.findAll({
        startDate: query.startDate,
        endDate: query.endDate,
        storeId: query.storeId,
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
    const transaction = await transactionRepository.findById(id);
    if (!transaction) throw new ApiError(404, 'transaski tidak ditemukan');
    return transaction;
}

async function getReceipt(id) {
    const transaction = await getById(id);

    return {
        header: {
            transactionCode: transaction.transaction_code,
            date: transaction.created_at,
            cashierName: transaction.cashier?.full_name || '-',
            storeName: transaction.store?.name || 'Walk-in Customer',
        },
        items: (transaction.items || []).map((item) => ({
            name: item.product?.name,
            unit: item.product?.unit,
            quantity: item.quantity,
            price: item.price_at_sale,
            subtotal: item.subtotal,
        })),
        totalAmount: transaction.total_amount,
        paymentMethod: transaction.payment_method,
        paymentStatus: transaction.payment_status,
    };
}

export const transactionService = { checkout, getAll, getById, getReceipt };