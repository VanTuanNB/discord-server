import ServerController from '@/controllers/server.controller';
import { Router } from 'express';

const router: Router = Router();
const serverController = new ServerController();
router
    .route('/')
    .get(serverController.getListServer.bind(serverController))
    .post(serverController.create.bind(serverController));

export default router;
