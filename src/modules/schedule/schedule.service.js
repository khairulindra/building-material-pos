import ApiError from '../../utils/ApiError.js';
import { scheduleRepository } from './schedule.repository.js';

async function getAll(query) {
  const page = Number(query.page) || 1;
  const limit = Math.min(Number(query.limit) || 20, 100);

  const { data, total } = await scheduleRepository.findAll({
    status: query.status,
    page,
    limit,
  });

  return {
    items: data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function getById(id) {
  const schedule = await scheduleRepository.findById(id);
  if (!schedule) throw new ApiError(404, 'Jadwal pembayaran tidak ditemukan');
  return schedule;
}

async function create(payload) {
  return scheduleRepository.create(payload);
}

async function update(id, payload) {
  await getById(id);
  return scheduleRepository.update(id, payload);
}

async function remove(id) {
  await getById(id);
  return scheduleRepository.remove(id);
}

async function markAsPaid(id) {
  await getById(id);
  return scheduleRepository.update(id, {
    status: 'paid',
    paid_at: new Date().toISOString(),
  });
}

async function getCalendarView({ month, year }) {
  const targetMonth = Number(month) || new Date().getMonth() + 1;
  const targetYear = Number(year) || new Date().getFullYear();

  const startDate = new Date(targetYear, targetMonth - 1, 1)
    .toISOString()
    .slice(0, 10);

  const endDate = new Date(targetYear, targetMonth, 0)
    .toISOString()
    .slice(0, 10);

  const schedules = await scheduleRepository.findByDateRange(
    startDate,
    endDate
  );

  const grouped = {};
  for (const item of schedules) {
    const dateKey = item.due_date;
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push({
      id: item.id,
      storeId: item.store?.id,
      storeName: item.store?.name || 'Tanpa Nama',
      amount: item.amount,
      status: item.status,
    });
  }

  return {
    month: targetMonth,
    year: targetYear,
    schedules: grouped,
  };
}

export const scheduleService = {
  getAll,
  getById,
  create,
  update,
  remove,
  markAsPaid,
  getCalendarView,
};