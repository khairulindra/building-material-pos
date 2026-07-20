import { supabaseAdmin } from '../../config/supabaseClient.js';

export const inventoryRepository = {
    getProductById: async (id) => {
        const { data, error } = await supabaseAdmin
            .from('products')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (error) throw error;
        return data;
    },


    updateStock: async (id, newStock) => {
        const { data, error } = await supabaseAdmin
          .from('products')
          .update({ stock_quantity: newStock })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data;
    },


    insertLog: async (logEntry) => {
        const { data, error } = await supabaseAdmin
          .from('inventory_logs')
          .insert(logEntry)
          .select()
          .single();
        if (error) throw error;
        return data;
    },


    getLogs: async ({ productId, page = 1, limit = 20 }) => {
        let query = supabaseAdmin
          .from('inventory_logs')
          .select(
             '*, product:products(id, name, sku)',
             { count: 'exact' }
          );

        if (productId)   query = query.eq('product_id', productId);

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await query
          .order('created_at', { ascending: false })
          .range(from, to);

        if (error) throw error;
        return { data, total: count || 0};
    },


    getLowStockProducts: async () => {
        const { data, error } = await supabaseAdmin
          .from('products')
          .select('*, category:categories(id, name)')
          .eq('is_active', true)
          .order('stock_quantity', { ascending: true });

        if (error) throw error;
        return (data || []).filter(
            (p) => p.stock_quantity <= p.min_stock_threshold
        );
    },
};