import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: env.clientUrl,
        credentials: true,
    })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

if (env.nodeEnv === 'development') {
    app.use(morgan('dev'));
}

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;