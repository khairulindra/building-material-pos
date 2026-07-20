import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import { scheduleService } from './schedule.service.js';

export const getAll = asyncHandler(async (req, res) => {
  const result = await scheduleService.getAll(req.query);
  res.status(200).json(new ApiResponse(200, 'Berhasil mengambil daftar jadwal pembayaran', result));
});

export const getById = asyncHandler(async (req, res) => {
  const data = await scheduleService.getById(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Berhasil mengambil detail jadwal', data));
});

export const getCalendarView = asyncHandler(async (req, res) => {
  const data = await scheduleService.getCalendarView(req.query);
  res.status(200).json(new ApiResponse(200, 'Berhasil mengambil data kalender jatuh tempo', data));
});

export const create = asyncHandler(async (req, res) => {
  const data = await scheduleService.create(req.body);
  res.status(201).json(new ApiResponse(201, 'Jadwal pembayaran berhasil dibuat', data));
});

export const update = asyncHandler(async (req, res) => {
  const data = await scheduleService.update(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, 'Jadwal pembayaran berhasil diperbarui', data));
});

export const markAsPaid = asyncHandler(async (req, res) => {
  const data = await scheduleService.markAsPaid(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Jadwal ditandai sebagai sudah dibayar', data));
});

export const remove = asyncHandler(async (req, res) => {
  await scheduleService.remove(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Jadwal pembayaran berhasil dihapus'));
});