import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IConnectionEntity } from '../entities/connection.entity';

const connectionSchema = new Schema<IConnectionEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        type: { type: String, required: true },
        userId: { type: String, required: true, ref: 'user' },
        revoke: { type: Boolean, required: true },
        isOffline: { type: Boolean, default: true },
        isOnline: { type: Boolean, default: false },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
connectionSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IConnectionEntity & { _id: string }>('connection', connectionSchema);
