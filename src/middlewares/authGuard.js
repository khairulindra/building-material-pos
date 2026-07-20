import { supabaseAdmin } from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Token autentikasi tidak ditemukan. Silakan login kembali.');
  }

  const token = authHeader.split(' ')[1];
  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data?.user) {
    throw new ApiError(401, 'Token tidak valid atau sudah kedaluwarsa. Silakan login kembali.');
  }

  req.authUser = data.user;
  next();
});

export const attachProfile = asyncHandler(async (req, res, next) => {
  const { data: profile, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', req.authUser.id)
    .single();

  if (error || !profile) {
    throw new ApiError(
      403,
      'Profil pengguna belum terdaftar. Silakan panggil endpoint /api/auth/sync terlebih dahulu setelah login.'
    );
  }

  req.user = {
    id: req.authUser.id,
    email: req.authUser.email,
    ...profile,
  };
  next();
});

export const protect = [verifyToken, attachProfile];

export const roleGuard = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, 'Anda tidak memiliki izin untuk mengakses resource ini'));
  }
  next();
};