import type { IUserSchema } from '@/core/interfaces/schemas/user.interface';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema<IUserSchema>(
    {
        id: { type: String, required: true },
        password: { type: String, required: true },
        profileId: { type: String, required: true },
    },
    {
        id: false,
        timestamps: true,
    },
);

export default mongoose.model<IUserSchema>('user', userSchema);
