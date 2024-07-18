import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IUnVerifyAccountEntity } from '../entities/unverify-account.entity';

export type IUnVerifyAccountSchema = IUnVerifyAccountEntity & { _id: string };

const unVerifyAccountSchema = new Schema<IUnVerifyAccountSchema>(
    {
        _id: {
            type: String,
            required: true,
        },
        email: { type: String, required: true },
        name: { type: String, required: true },
        dob: { type: String, required: true },
        password: { type: String, required: true },
        verificationCode: { type: Number, required: true },
        expiresTime: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
unVerifyAccountSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IUnVerifyAccountSchema>('unverify-account', unVerifyAccountSchema);
