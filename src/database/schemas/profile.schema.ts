import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IProfileEntity } from '../entities/profile.entity';

const profileSchema = new Schema<IProfileEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        userId: { type: String, required: true, ref: 'user' },
        name: { type: String, required: true },
        email: { type: String, required: true },
        avatar: { type: String, default: null },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
profileSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IProfileEntity & { _id: string }>('profile', profileSchema);
