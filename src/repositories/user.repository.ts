import type { IUserEntity } from '@/database/entities/user.entity';
import userSchema from '@/database/schemas/user.schema';
import { BaseRepository } from './base.repository';

export default class UserRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async checkUserExists(id: string): Promise<{ _id: string } | null> {
        return await userSchema.exists({ _id: id });
    }

    public async getList(): Promise<IUserEntity[]> {
        return await userSchema.find().lean();
    }

    public async getById(id: string): Promise<IUserEntity | null> {
        return await userSchema.findById(id);
    }

    public async getByEmail(email: string): Promise<IUserEntity | null> {
        return await userSchema.findOne({ email });
    }

    public async create(payload: IUserEntity): Promise<IUserEntity | null> {
        return await userSchema.create({ _id: payload.id, ...payload });
    }

    public async update(payload: IUserEntity): Promise<IUserEntity | null> {
        return await userSchema.findByIdAndUpdate({ _id: payload.id }, payload, { new: true, upsert: true });
    }
}
