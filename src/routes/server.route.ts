import ServerController from '@/controllers/server.controller';
import { Router } from 'express';

const router: Router = Router();
const serverController = new ServerController();

router.route('/:id').delete(serverController.permanentlyDelete.bind(serverController));

router
    .route('/')
    .get(serverController.getListServerByUserId.bind(serverController))
    .post(serverController.create.bind(serverController));

export default router;
