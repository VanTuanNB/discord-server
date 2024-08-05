import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IReactionEntity } from '../entities/reaction.entity';

const reactionSchema = new Schema<IReactionEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        counter: { type: Number, required: true },
        emoji: { type: String, required: true },
        memberId: { type: String, required: true },
        messageId: { type: String, required: true },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
reactionSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IReactionEntity & { _id: string }>('reaction', reactionSchema);
