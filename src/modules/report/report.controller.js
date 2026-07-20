import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';
import { reportService } from './report.service.js';

export const getPerformanceReport = asyncHandler(async (req, res) => {
  const { period, date } = req.query;

  if (!['weekly', 'monthly'].includes(period)) {
    throw new ApiError(400, "Query 'period' wajib diisi: 'weekly' atau 'monthly'");
  }

  const data = await reportService.generatePerformanceReport(period, date);
  res.status(200).json(new ApiResponse(200, `Laporan kinerja ${period} berhasil dibuat`, data));
});