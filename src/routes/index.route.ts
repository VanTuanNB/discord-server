import { Router } from 'express';
const rootRouter = Router();

rootRouter.get('/test', (req, res) => {
    res.json('testing routing');
});

export default rootRouter;
