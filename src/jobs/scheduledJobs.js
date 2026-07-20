import cron from 'node-cron';
import { env } from '../config/env.js';
import { supabaseAdmin } from '../config/supabaseClient.js';
import { inventoryRepository } from '../modules/inventory/inventory.repository.js';
import { scheduleRepository } from '../modules/schedule/schedule.repository.js';
import logger from '../utils/logger.js';

async function checkLowStockAndNotify() {
    const lowStockProducts = await inventoryRepository.getLowStockProducts();

    if (lowStockProducts.length === 0)  {
        logger.info('[CRON] Tidak ada produk dengan stok menipis hari ini');
        return;
    }

    const notifications = lowStockProducts.map((p) => ({
        type: 'low_stock',
        title: 'Stok Menipis',
        message: `Stok "${p.name}" tersisa ${p.stock_quantity} ${p.unit} (batas minimum: ${p.min_stock_threshold})`,
        reference_id: p.id,
    }));

    const { error } = await supabaseAdmin
       .from('notifications')
       .insert(notifications);

    if (error) {
        logger.error('[CRON] Gagal membuat notifikasi stok menipis:', error);
        return;
    }

    logger.info(
        `[CORN] ${notifications.length} notifikasi stok menipis berhasil dibuat`
    );
}

async function checkOverduePayments() {
    const today = new Date().toISOString().slice(0, 10);
    const overdueSchedules = await schedulesRepository.findOverdueUnflagged(today);

    if (overdueSchedules.length === 0) {
        logger.info('[CRON] Tidak ada jadwal pembayaran yang baru jatuh tempo hari ini');
        return;
    }

    const ids = overdueSchedules.map((s) => s.id);

    const { error:updateError } = await supabaseAdmin
       .from('payment_schedules')
       .update({ status: 'overdue' })
       .in('id', ids);

    if (updateError) {
        logger.error('[CRON] Gagal update status overdue:', updateError);
        return;
    }

    const notifications = overdueSchedules.map((s) => ({
        type: 'payment_overdue',
        title: 'Pembayaran Jatuh Tempo',
        message: `Toko "${s.store?.name || 'Tidak diketahui'}" telat membayar Rp${Number(s.amount).toLocaleString('id-ID')} (jatuh tempo: ${s.due_date})`,
        reference_id: s.id,
    }));

    await supabaseAdmin.from('notifications').insert(notifications);

    logger.info(`[CRON] ${ids.length} jadwal pembayaran ditandai overdue & dinotifikasi`);
}

export function startScheduledJobs() {
    cron.schedule(env.inventoryCronSchedule, async () => {
        logger.info('[CRON] Menjalankan pengecekan otomatisasi harian...');
        await checkLowStockAndNotify();
        await checkOverduePayments();
    });

    logger.info(
        `[CRON] Job otomatisasi terdaftar dengan jadwal: "${env.inventoryCronSchedules}"`
    );
}

