import { supabaseAdmin } from '../../config/supabaseClient.js';

const TABLE = 'products';
const SELECT_WITH_CATEGORY = '*, category:categories(id, name)';

export const productRepository = {
    findAll: async ({ categoryId, search, page = 1, limit = 20 }) => {
        let query = supabaseAdmin
          .from(TABLE)
          .select(SELECT_WITH_CATEGORY, { count: 'exact' });

        if (categoryId) query = query.eq('category_id', categoryId);
        if (search) query = query.or(`name.ilike.%${search}%,sku.like.%${search}%`);


        const from = (page - 1) * limit;
        const to = from + limit -1;

        const { data, error, count } = await query
          .order('name', { ascending: true })
          .range(from, to);

        if (error) throw error;
        return { data, total:count || 0 };
    },

    findById: async (id) => {
        const { data, error } = await supabaseAdmin
          .from(TABLE)
          .select(SELECT_WITH_CATEGORY)
          .eq('id', id)
          .maybeSingle();
        if (error) throw error;
        return data;
    },


    findByBarcode: async (barcode) => {
        const { data, error } = await supabaseAdmin
          .from(TABLE)
          .select(SELECT_WITH_CATEGORY)
          .eq('barcode', barcode)
          .maybeSingle();
        if (error) throw error;
        return data;
    },


    findBySku: async (sku) => {
        const { data, error } = await supabaseAdmin
          .from(TABLE)
          .select('id')
          .eq('sku', sku)
          .maybeSingle();
        if (error) throw error;
        return data;
    },

    create: async (payload) => {
        const { data, error } = await supabaseAdmin
          .from(TABLE)
          .insert(payload)
          .select(SELECT_WITH_CATEGORY)
          .single();
        if (error) throw error;
        return data;
    },


    update: async (id, payload) => {
        const { data, error } = await supabaseAdmin
          .from(TABLE)
          .update(payload)
          .eq('id', id)
          .select(SELECT_WITH_CATEGORY)
          .single();
        if (error) throw error;
        return data;
    },

    remove: async (id) => {
        const { error } = await  supabaseAdmin
          .from(TABLE)
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
    },
};