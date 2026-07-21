import { supabaseAdmin } from '../../config/supabaseClient.js';

export const getAll = async () => {
    const { data, error } = await supabaseAdmin
       .from('store_categories')
       .select('*')
       .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

export const getById = async (id) => {
    const { data, error } = await supabaseAdmin
       .from('store_categories')
       .select('*')
       .eq('id', id)
       .single();

    if (error) throw error;
    return data;
};


export const create = async (payload) => {
    const { data, error } = await supabaseAdmin
       .from('store_categories')
       .insert([payload])
       .select()
       .single();

    if (error) throw error;
    return data;
};


export const update = async (id, payload) => {
    const { data, error } = await supabaseAdmin
       .from('store_categories')
       .update(payload)
       .eq('id', id)
       .select()
       .single();

    if (error) throw error;
    return data;
};


export const remove = async (id) => {
    const { error } = await supabaseAdmin
       .from('store_categories')
       .delete()
       .eq('id', id);

    if (error) throw error;
    return true;
};


export const storeCategoryService = { getAll, getById, create, update, remove };