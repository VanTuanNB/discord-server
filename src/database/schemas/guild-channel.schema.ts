import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IGuildChannelEntity } from '../entities/guild-channel.entity';

const guildChannelSchema = new Schema<IGuildChannelEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        userId: { type: String, required: true, ref: 'user' },
        serverId: { type: String, required: true, ref: 'server' },
        channels: [{ type: String, required: true, ref: 'channel' }],
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
guildChannelSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IGuildChannelEntity & { _id: string }>('guild-channel', guildChannelSchema);
