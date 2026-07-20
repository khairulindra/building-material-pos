import { supabaseAdmin } from '../../config/supabaseClient.js';

const TABLE = 'categories';

export const categoryRepository = {
  findAll: async () => {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .select('*')
      .order('name', { ascending: true });
    if (error) throw error;
    return data;
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

  countProductsByCategory: async (id) => {
    const { count, error } = await supabaseAdmin
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', id);
    if (error) throw error;
    return count || 0;
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
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },
};