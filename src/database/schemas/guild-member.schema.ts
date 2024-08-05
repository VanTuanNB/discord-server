import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IGuildMemberEntity } from '../entities/guild-member.entity';

const guildMemberSchema = new Schema<IGuildMemberEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        memberId: { type: String, required: true },
        serverId: { type: String, required: true },
        nickname: { type: String, default: null },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
guildMemberSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IGuildMemberEntity & { _id: string }>('guild-member', guildMemberSchema);
