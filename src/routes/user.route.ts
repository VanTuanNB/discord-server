import UserController from '@/controllers/user.controller';
import { Router } from 'express';

const router: Router = Router();
const userControllerInstance = new UserController();
router
    .route('')
    .get(userControllerInstance.getList.bind(UserController))
    .post(userControllerInstance.create.bind(UserController));

export default router;
