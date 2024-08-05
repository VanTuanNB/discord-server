import type { IServerEntity } from '@/database/entities/server.entity';
import serverSchema from '@/database/schemas/server.schema';
import { BaseRepository } from './base.repository';

export class ServerRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(): Promise<IServerEntity[]> {
        return await serverSchema.find();
    }

    public async getById(id: string): Promise<IServerEntity | null> {
        return await serverSchema.findById(id);
    }

    public async create(payload: IServerEntity): Promise<IServerEntity | null> {
        return await serverSchema.create({ _id: payload.id, ...payload });
    }

    public async permanentlyDelete(id: string): Promise<IServerEntity | null> {
        return await serverSchema.findOneAndDelete({ _id: id });
    }
}
