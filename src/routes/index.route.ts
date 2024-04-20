import { Router } from 'express';
import userRouter from './user/index.route';
const rootRouter = Router();

rootRouter.use('/user', userRouter);

export default rootRouter;
