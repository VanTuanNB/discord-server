import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IServerEntity } from '../entities/server.entity';

const serverSchema = new Schema<IServerEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        ownerId: { type: String, ref: 'user' },
        members: [{ type: String, ref: 'user' }],
        channels: [{ type: String, ref: 'user' }],
        thumbnail: { type: String, default: null },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);

serverSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IServerEntity & { _id: string }>('server', serverSchema);
