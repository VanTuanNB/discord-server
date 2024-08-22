import type { IChannelEntity, IPermanentlyDeleteMultipleChannelModel } from '@/database/entities/channel.entity';
import channelSchema from '@/database/schemas/channel.schema';
import { BaseRepository } from './base.repository';

export class ChannelRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getById(channelId: string): Promise<IChannelEntity | null> {
        return await channelSchema.findById(channelId);
    }

    public async insertMultiple(payload: IChannelEntity[]): Promise<IChannelEntity[] | null> {
        return await channelSchema.insertMany(this.formatterArrayIds(payload));
    }

    public async permanentlyDeleteMultiple(
        payload: IPermanentlyDeleteMultipleChannelModel,
    ): Promise<DeleteResult | null> {
        console.log('payload', payload);
        return await channelSchema.deleteMany({ serverId: payload.serverId, _id: { $in: payload.channelIds } });
    }
}
