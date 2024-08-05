import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IChannelEntity } from '../entities/channel.entity';

const channelSchema = new Schema<IChannelEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        ownerId: { type: String, required: true },
        serverId: { type: String, required: true },
        type: { type: Number, required: true },
        topic: { type: String, required: true },
        lastMessage: { type: String, default: null },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
channelSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IChannelEntity & { _id: string }>('channel', channelSchema);
