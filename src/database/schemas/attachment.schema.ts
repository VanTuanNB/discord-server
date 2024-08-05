import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IAttachmentEntity } from '../entities/attachment.entity';

const attachmentSchema = new Schema<IAttachmentEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        fileName: { type: String, required: true },
        size: { type: Number, required: true },
        title: { type: String, required: true },
        url: { type: String, required: true },
        proxyUrl: { type: String, default: '' },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
attachmentSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IAttachmentEntity & { _id: string }>('attachment', attachmentSchema);
