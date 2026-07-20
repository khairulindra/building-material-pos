import { supabaseAdmin } from '../../config/supabaseClient.js';

const SELECT_WITH_STORE = '*, store:stores(id, name, owner_name, phone)';

export const scheduleRepository = {
    findAll: async ({ status, page = 1, limit = 20 }) => {
        let query = supabaseAdmin
           .from('payment_schedules')
           .select(SELECT_WITH_STORE, { count: 'exact' });

        if (status) query = query.eq('status', status);

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await query
           .order('due_date', { ascending: true })
           .range(from, to);

        if (error) throw error;
        return { data, total: count || 0 };
    },


    findById: async (id) => {
        const { data, error } = await supabaseAdmin
           .from('payment_schedules')
           .select(SELECT_WITH_STORE)
           .eq('id', id)
           .maybeSingle();
        if (error) throw error;
        return data;
    },


    findByDateRange: async (startDate, endDate) => {
        const { data, error } = await supabaseAdmin
           .from('payment_schedules')
           .select(SELECT_WITH_STORE)
           .gte('due_date', startDate)
           .lte('due_date', endDate)
           .order('due_date', { ascending: true });
        if (error) throw error;
        return data;
    },


    create: async (payload) => {
        const { data, error } = await supabaseAdmin
           .from('payment_schedules')
           .insert(payload)
           .select(SELECT_WITH_STORE)
           .single();
        if (error) throw error;
        return data;
    },


    update: async (id, payload) => {
        const { data, error } = await supabaseAdmin
           .from('payment_schedules')
           .update(payload)
           .eq('id', id)
           .select(SELECT_WITH_STORE)
           .single();
        if (error) throw error;
        return data;
    },


    remove: async (id) => {
        const { error } = await supabaseAdmin
           .from('payment_schedules')
           .delete()
           .eq('id', id);
        if (error) throw error;
        return true;
    },


    findOverdueUnflagged: async (todayDate) => {
        const { data, error } = await supabaseAdmin
           .from('payment_schedules')
           .select('*, store:stores(name)')
           .eq('status', 'pending')
           .lt('due_date', todayDate);
        if (error) throw error;
        return data;
    },
};