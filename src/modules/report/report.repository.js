import { supabaseAdmin } from '../../config/supabaseClient.js';

export const reportRepository = {
    getSalesSummary: async (start, end) => {
        const { data, error } = await supabaseAdmin.rpc(
            'get_sales_summary',
            { p_start: start, p_end: end }
        );
        if (error) throw new error;
        return data?.[0] || {
            total_transactions: 0,
            total_revenue: 0,
            average_transaction: 0,
        };
    },

    getTopProducts: async (start, end, limit = 5) => {
        const { data, error } = await supabaseAdmin.rpc(
            'get_top_products',
            { p_start: start, p_end: end, p_limit: limit }
        );
        if (error) throw error;
        return data || [];
    },

    getPaymentComplianceSummary: async (start, end) => {
        const { data, error } = await supabaseAdmin
           .from('payment_schedules')
           .select('status, ammount')
           .gte('due_date', start.slice(0, 10))
           .lte('due_date', end.slice(0, 10));

        if (error) throw error;

        const summary = {
            pending: { count: 0, amount: 0 },
            paid: { count: 0, amount: 0 },
            overdue: { count: 0, amount: 0 },
        };


        for (const row of data || []) {
            if (summary[row.status]) {
                summary[row.status].count += 1;
                summary[row.status].amount += Number(row.amount);
            }
        }

        return summary;
    },

    getLowStockCount: async () => {
        const { data, error } = await supabaseAdmin
           .from('products')
           .select('stock_quantity, min_stock_threshold')
           .eq('is_active', true);

        if (error) throw error;
        return (data || []).filter(
            (p) => p.stock_quantity <= p.min_stock_threshold).length;
    },
};