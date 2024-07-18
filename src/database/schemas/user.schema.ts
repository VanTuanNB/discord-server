import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IUserEntity } from '../entities/user.entity';

const userSchema = new Schema<IUserEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        password: { type: String, required: true },
        profileId: { type: String, required: true },
        refreshToken: { type: String, required: true },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IUserEntity & { _id: string }>('user', userSchema);
