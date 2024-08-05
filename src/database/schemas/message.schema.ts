import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IMessageEntity } from '../entities/message.entity';

const messageSchema = new Schema<IMessageEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        author: { type: String, required: true, ref: 'profile' },
        channelMessageId: { type: String, required: true, ref: 'channelMessage' },
        content: { type: String, required: true },
        attachments: [{ type: String, default: [] }],
        embeds: [{ type: String, default: [] }],
        mentions: [{ type: String, default: [] }],
        reactions: [{ type: String, default: [] }],
        mentionEveryone: { type: Boolean, default: false },
        pinned: { type: Boolean, default: false },
        tts: { type: Boolean, default: false },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
messageSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IMessageEntity & { _id: string }>('message', messageSchema);
