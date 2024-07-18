import { Required } from '@/core/decorators/validate-payload/index.decorator';
import UserService from '@/services/user.service';
import type { Request, Response } from 'express';
import { PostNewUserModel } from './models/user.model';

export default class UserController {
    private userService = new UserService();
    constructor() {}
    public async getList(req: Request, res: Response): Promise<Response> {
        const result = await this.userService.getList();
        return res.status(result.status).json(result);
    }

    @Required(PostNewUserModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const { unVerifyAccountId } = req.body;
        const result = await this.userService.createNewUser(unVerifyAccountId);
        return res.status(result.status).json(result);
    }
}
