import { supabaseAdmin } from '../../config/supabaseClient.js';

const SELECT_DETAIL =  '*, store:stores(id, name, owner_name), cashier:profiles(id, full_name), items:transaction_items(*, product:products(id, name, sku, unit))';

export const transactionRepository = {
    createPosTransaction: async ({
        storeId,
        cashierId,
        paymentMethod,
        paymentStatus,
        notes,
        items,
    }) => {
        const { data, error } = await supabaseAdmin.rpc(
            'create_pos_transaction',
            {
                p_store_id: storeId || null,
                p_cashier_id: cashierId,
                p_payment_method: paymentMethod,
                p_payment_status: paymentStatus,
                p_notes: notes || null,
                p_items: items,
            }
        );
        if (error) throw error;
        return data;
    },


    findAll: async ({ startDate, endDate, storeId, page = 1, limit = 20 }) => {
        let query = supabaseAdmin
           .from('transactions')
           .select('*, store:stores(id, name), cashier:profiles(id, full_name)', { count: 'exact' });

        if (startDate) query = query.gte('created_at', startDate);
        if (endDate) query = query.lte('created_at', endDate);
        if (storeId) query = query.eq('store_id', storeId);

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await query
           .order('created_at', { ascending: false })
           .range(from, to);

        if (error) throw error;
        return { data, total: count || 0 };
    },


    findById: async (id) => {
        const { data, error } = await supabaseAdmin
           .from('transaction')
           .select(SELECT_DETAIL)
           .eq('id', id)
           .maybeSingle();
        if (error) throw error;
        return data;
    },
};