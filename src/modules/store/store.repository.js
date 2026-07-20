import { supabaseAdmin } from '../../config/supabaseClient.js';

const TABLE = 'stores';

export const storeRepository = {
    findAll: async ({ search, page = 1, limit = 20 }) => {
        let query = supabaseAdmin
          .from(TABLE)
          .select('*', { count: 'exact' })
          .eq('is_active', true);

        if (search) query = query.ilike('name', `%${search}%`);

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await query
          .order('name', { ascending: true })
          .range(from, to);

        if (error) throw error;
        return { data, total: count || 0 };
    },


    findById: async (id) => {
        const { data, error } = await supabaseAdmin
          .from(TABLE)
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (error) throw error;
        return data;
    },


    create: async (payload) => {
        const { data, error } = await supabaseAdmin
          .from(TABLE)
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        return data;
    },


    update: async (id, payload) => {
        const { data, error } = await supabaseAdmin
          .from(TABLE)
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data;
    },


    remove: async (id) => {
        const { error } = await supabaseAdmin
          .from(TABLE)
          .update({ is_active: false })
          .eq('id', id);
        if (error) throw error;
        return true;
    },
}