import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IEmojiEntity } from '../entities/emoji.entity';

const emojiSchema = new Schema<IEmojiEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        code: { type: String, required: true },
        name: { type: String, required: true },
        url: { type: String, required: true },
        isAnimated: { type: Boolean, required: true },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
emojiSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IEmojiEntity & { _id: string }>('emoji', emojiSchema);
