import { supabaseAdmin } from '../../config/supabaseClient.js';

async function syncProfile(authUser) {
  const payload = {
    id: authUser.id,
    email: authUser.email,
    full_name: authUser.user_metadata?.full_name
              || authUser.user_metadata?.name
              || null,
    avatar_url: authUser.user_metadata?.avatar_url
               || authUser.user_metadata?.picture
               || null,
  };

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getProfileById(userId) {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export const authService = { syncProfile, getProfileById };