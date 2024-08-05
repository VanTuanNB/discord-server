import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IChannelMessageEntity } from '../entities/channel-message.entity';

const channelMessageSchema = new Schema<IChannelMessageEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        channelId: { type: String, required: true, ref: 'channel' },
        memberId: { type: String, required: true, ref: 'member' },
        messageId: { type: String, required: true, ref: 'message' },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
channelMessageSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IChannelMessageEntity & { _id: string }>('channel-message', channelMessageSchema);
