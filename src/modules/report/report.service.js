import { getDateRange } from '../../utils/dateRange.js';
import { reportRepository } from './report.repository.js';

async function generatePerformanceReport(period, referenceDate) {
    const { start, end } = getDateRange(
        period,
        referenceDate ? new Date(referenceDate) : new Date()
    );

    const [salesSummary, topProducts, paymentCompliance, lowStockCount] = 
        await Promise.all([
            reportRepository.getSalesSummary(start, end),
            reportRepository.getTopProducts(start, end, 5),
            reportRepository.getPaymentComplianceSummary(start, end),
            reportRepository.getLowStockCount(),
        ]);

    return {
        period,
        rangeStart: start,
        rangeEnd: end,
        salesSummary: {
            totalTransactions: Number(salesSummary.total_transactions || salesSummary.total_transactions || 0),
            totalRevenue: Number(salesSummary.total_revenue),
            averageTransaction: Number(salesSummary.average_transaction),
        },
        topProducts: topProducts.map((p) => ({
            productId: p.product_id,
            productName: p.product_name,
            totalQuantitySold: Number(p.total_quantity),
            totalSales: Number(p.total_sales),
        })),
        paymentCompliance,
        inventoryAlert : {
            lowStockProductCount: lowStockCount,
        },
    };
}


export const reportService = { generatePerformanceReport };