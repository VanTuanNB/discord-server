import type { IUserEntity } from '@/core/interfaces/entities/user.entity';
import userSchema from '@/database/schemas/user.schema';

export default class UserRepository {
    constructor() {}

    public async getList(): Promise<IUserEntity[]> {
        try {
            return await userSchema.find();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public async create(payload: IUserEntity): Promise<IUserEntity | null> {
        try {
            const user = await userSchema.create(payload);
            return user || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
