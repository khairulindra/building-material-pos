import app from './app.js';
import { env } from './config/env.js';
import { startScheduledJobs } from './jobs/scheduledJobs.js';
import logger from './utils/logger.js';

app.listen(env.port, () => {
    logger.info(`🚀 Server berjalan di http://localhost:${env.port}`);
    logger.info(`📦 Environment: ${env.nodeEnv}`);
    logger.info(`🌐 CORS diizinkan dari: ${env.clientUrl}`);
    startScheduledJobs();
})