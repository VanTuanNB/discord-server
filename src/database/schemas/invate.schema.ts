import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IInviteEntity } from '../entities/invite.entity';

const inviteSchema = new Schema<IInviteEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        sender: { type: String, required: true, ref: 'profile' },
        receiver: { type: String, required: true, ref: 'profile' },
        serverId: { type: String, required: true, ref: 'server' },
        expire: { type: String, required: true },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
inviteSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IInviteEntity & { _id: string }>('invite', inviteSchema);
