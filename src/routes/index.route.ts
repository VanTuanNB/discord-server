import { Router } from 'express';
const rootRouter = Router();

rootRouter.use('/test', (req, res) => {
    res.json('testing routing');
});

export default rootRouter;
