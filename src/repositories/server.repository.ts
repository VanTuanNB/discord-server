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

    public async getListPopulates(userId: string): Promise<IServerEntity[]> {
        return await serverSchema.find({ ownerId: userId }).populate({
            path: 'guildChannel',
            populate: {
                path: 'channels',
            },
        });
    }

    public async getByUserId(userId: string): Promise<IServerEntity[]> {
        return await serverSchema.find({ ownerId: userId });
    }

    public async getById(id: string): Promise<IServerEntity | null> {
        return await serverSchema.findById(id);
    }

    public async getByIdAndUserId(userId: string, serverId: string): Promise<IServerEntity | null> {
        return await serverSchema.findOne({ ownerId: userId, id: serverId });
    }

    public async create(payload: IServerEntity): Promise<IServerEntity | null> {
        return await serverSchema.create(this.formatterObjectId(payload));
    }

    public async permanentlyDelete(id: string): Promise<IServerEntity | null> {
        return await serverSchema.findOneAndDelete({ _id: id });
    }
}
