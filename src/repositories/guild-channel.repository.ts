import type { IGuildChannelEntity } from '@/database/entities/guild-channel.entity';
import guildChannelSchema from '@/database/schemas/guild-channel.schema';

export class GuildChannelRepository {
    constructor() {}

    public async insert(payload: IGuildChannelEntity): Promise<IGuildChannelEntity | null> {
        return await guildChannelSchema.create({ ...payload, _id: payload.id });
    }

    public async getListPopulation(_id: string): Promise<any> {
        return await guildChannelSchema.find({ _id }).populate('channels');
    }

    public async permanentlyDelete(guildChannelId: string): Promise<IGuildChannelEntity | null> {
        return await guildChannelSchema.findOneAndDelete({ _id: guildChannelId });
    }
}
