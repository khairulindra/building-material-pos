import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import { inventoryService } from './inventory.service.js';

export const adjustStock = asyncHandler(async (req, res) => {
    const { productId, quantityChange, type, note } = req.body;

    const result = await inventoryService.adjustStock({
        productId,
        quantityChange,
        type,
        note,
        userId: req.user.id
    });

    res.status(200).json(new ApiResponse(200, 'Stock berhasil diperbarui', result));
});

export const getLowStock = asyncHandler(async (req, res) => {
    const data = await inventoryService.getLowStock();
    res.status(200).json(new ApiResponse(200, 'Berhasil mengambil daftar produk stock menipis', data));
});

export const getLogs = asyncHandler(async (req, res) => {
    // Memanggil fungsi getLogs dari service (pastikan fungsi ini sudah ada di service Anda)
    const data = await inventoryService.getLogs(); 
    
    res.status(200).json(new ApiResponse(200, 'Berhasil mengambil riwayat log inventory', data));
});
