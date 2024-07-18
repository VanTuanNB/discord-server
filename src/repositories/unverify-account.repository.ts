import type { IUnVerifyAccountEntity } from '@/database/entities/unverify-account.entity';
import unVerifyAccountSchema from '@/database/schemas/unverify-account.schema';

export default class UnVerifyAccountRepository {
    constructor() {}

    public async getById(id: string): Promise<IUnVerifyAccountEntity | null> {
        return await unVerifyAccountSchema.findById(id);
    }

    public async getByEmail(email: string): Promise<IUnVerifyAccountEntity | null> {
        return await unVerifyAccountSchema.findOne({ email });
    }

    public async create(payload: IUnVerifyAccountEntity): Promise<IUnVerifyAccountEntity | null> {
        return await unVerifyAccountSchema.create({ _id: payload.id, ...payload });
    }

    public async update(payload: IUnVerifyAccountEntity): Promise<IUnVerifyAccountEntity | null> {
        return await unVerifyAccountSchema.findByIdAndUpdate({ _id: payload.id }, payload, { new: true, upsert: true });
    }

    public async permanentlyDelete(id: string): Promise<IUnVerifyAccountEntity | null> {
        return await unVerifyAccountSchema.findOneAndDelete({ _id: id }, { new: true });
    }
}
