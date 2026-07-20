import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import { authService } from './auth.service.js';

export const sync = asyncHandler(async (req, res) => {
    const profile = await authService.syncProfile(req.authUser);
    res
      .status(200)
      .json(new ApiResponse(200, 'Profil berhasil disinkronkan', profile));
});

export const me = asyncHandler(async (req, res) => {
    res
      .status(200)
      .json(new ApiResponse(200, 'Berhasil mengambil data user', req.user));
});