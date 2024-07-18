import type { IProfileEntity } from '@/database/entities/profile.entity';
import profileSchema from '@/database/schemas/profile.schema';
import userSchema from '@/database/schemas/user.schema';

export default class ProfileRepository {
    constructor() {}

    public async getList(): Promise<IProfileEntity[]> {
        try {
            return await userSchema.find();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public async getById(id: string): Promise<IProfileEntity | null> {
        return await profileSchema.findById(id);
    }

    public async create(payload: IProfileEntity): Promise<IProfileEntity | null> {
        return await profileSchema.create({ _id: payload.id, ...payload });
    }

    public async permanentlyDelete(profileId: string): Promise<IProfileEntity | null> {
        return await profileSchema.findOneAndDelete({ _id: profileId });
    }
}
