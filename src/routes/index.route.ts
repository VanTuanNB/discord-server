import ExceptionController from '@/controllers/exception.controller';
import { Router } from 'express';
import authRouter from './auth.route';
import serverRouter from './server.route';
import userRouter from './user.route';
const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/user', userRouter);
rootRouter.use('/server', serverRouter);
rootRouter.use('*', new ExceptionController().endpointException);

export default rootRouter;
