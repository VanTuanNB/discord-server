import express from 'express';

import { APP_PATH } from './core/common/constants/index.constant.ts';
import rootRouter from './routes/index.route.ts';

const app = express();
const port = 5000;

app.use(APP_PATH, rootRouter);

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
