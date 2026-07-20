import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
];

function validateEnv() {
    const missing = requiredEnvVars.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        console.error(`[ENV ERROR] Environment variable berikut belum diset: ${missing.join(', ')}`);
        console.error(`Silahkan copy .env.example menjadi .env dan isi kredensial Supabase Anda. `);
        process.exit(1);
    }
}

validateEnv();

export const env = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    supabase: {
        url: process.env.SUPABASE_URL,
        anonKey: process.env.SUPABASE_ANON_KEY,
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  inventoryCronSchedule: process.env.INVENTORY_CRON_SCHEDULE || '0 6 * * *',
};