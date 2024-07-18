import cors from 'cors';
import express from 'express';

import '@/core/configs/moment-timezone.config';
import { APP_PATH } from '@/core/constants/index.constant';
import Database from './database/connect.database';
import rootRouter from './routes/index.route';

const app = express();
const port: number = Number(process.env.PORT) || 5000;
const whitelist = ['http://localhost:4209', 'http://localhost:5000'];
app.use(
    cors((req, callback) => {
        const corsOptions = { origin: false };
        if (whitelist.indexOf(req.header('Origin') ?? '') !== -1) {
            corsOptions.origin = true;
        } else {
            corsOptions.origin = false;
        }
        callback(null, {
            ...corsOptions,
            methods: ['GET', 'HEAD', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
        });
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(APP_PATH, rootRouter);
// connectDb
Database.connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
