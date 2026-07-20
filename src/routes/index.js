import { Router } from 'express';

import authRoutes from '../modules/auth/auth.routes.js';
import categoryRoutes from '../modules/category/category.routes.js';
import productRoutes from '../modules/product/product.routes.js';
import inventoryRoutes from '../modules/inventory/inventory.routes.js';
import storeRoutes from '../modules/store/store.routes.js';
import scheduleRoutes from '../modules/schedule/schedule.routes.js';
import transactionRoutes from '../modules/transaction/transaction.routes.js';
import reportRoutes from '../modules/report/report.routes.js';

const router = Router();

router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is healthy',
        timestamp: new Date().toISOString(),
    });
});

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/stores', storeRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/transactions', transactionRoutes);
router.use('/reports', reportRoutes);

export default router;