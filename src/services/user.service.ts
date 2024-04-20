import type { IResponseServer } from '@/core/interfaces/common.interface';
import { ResponseHandler } from '@/repositories/models/common/response-handler.common';
import { UserModal } from '@/repositories/models/user.model';
import UserRepository from '@/repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

export default class UserService {
    constructor() {}

    public async getList(): Promise<IResponseServer> {
        try {
            const users = await new UserRepository().getList();
            return new ResponseHandler(201, true, 'POST_USER_SUCCESSFULLY', users);
        } catch (error) {
            return new ResponseHandler(500, false, 'INTERNAL_ERROR', null, error);
        }
    }

    public async createNewUser(payload: any): Promise<IResponseServer> {
        try {
            const id = uuidv4();
            const validate = await new UserModal(payload).validator();
            console.log('validate', validate);
            if (validate) return validate;
            const newUser = await new UserRepository().create({
                id,
                ...payload,
            });
            return new ResponseHandler(201, true, 'POST_USER_SUCCESSFULLY', newUser);
        } catch (error) {
            return new ResponseHandler(500, false, 'INTERNAL_ERROR', null, error);
        }
    }
}
