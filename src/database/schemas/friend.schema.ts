import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IFriendEntity } from '../entities/friend.entity';

const friendSchema = new Schema<IFriendEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        userId: { type: String, required: true, ref: 'user', unique: true },
        friends: [{ type: String, ref: 'user' }],
        acceptRequests: [{ type: String, ref: 'user' }],
        sendRequests: [{ type: String, ref: 'user' }],
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
friendSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IFriendEntity & { _id: string }>('friends', friendSchema);
