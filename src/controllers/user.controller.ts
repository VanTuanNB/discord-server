import UserService from '@/services/user.service';
import type { Request, Response } from 'express';

export default class UserController {
    constructor() {}
    public async getList(req: Request, res: Response): Promise<Response> {
        const result = await new UserService().getList();
        return res.status(result.status).json(result);
    }
    public async create(req: Request, res: Response): Promise<Response> {
        const payload = req.body;
        const result = await new UserService().createNewUser(payload);
        return res.status(result.status).json(result);
    }
}
