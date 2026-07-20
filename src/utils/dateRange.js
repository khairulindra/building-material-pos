import ApiError from './ApiError.js';

export function getDateRange(period, referenceDate = new Date()) {
    const ref = new Date(referenceDate);
    if (Number.isNaN(ref.getTime())) {
        throw new ApiError(400, 'Format Tanggal Tidak Valid!');
    }

    let start, end;

    if (period === 'weekly') {
        const day = ref.getDay // 0 (Minggu) - 6 (Sabtu)
        const diffToMonday = day === 0 ? -6 : 1 - day;
        start = new Date(ref);
        start.setDate(ref.getDate() + diffToMonday);
        start.setHours(0, 0, 0, 0);

        end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
    } else if (period === 'monthly') {
        start = new Date(ref.getFullYear(), ref.getMonth(), 1, 0, 0, 0, 0);
        end = new Date(ref.getFullYear(), ref.getMonth() + 1, 0, 23, 59, 59, 999);
    } else {
        throw new ApiError(400, "Parameter 'period' harus 'weekly' atau 'monthly'");
    }

    return { start: start.toISOString(), end: end.toISOString };

}