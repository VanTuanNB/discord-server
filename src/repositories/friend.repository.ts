import type { IFriendEntity } from '@/database/entities/friend.entity';
import friendSchema from '@/database/schemas/friend.schema';
import { BaseRepository } from './base.repository';

export class FriendRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getByUserId(userId: string): Promise<IFriendEntity | null> {
        return await friendSchema.findOne({ userId });
    }

    public async checkRecipientExitsInListSenderRequest(
        userId: string,
        recipient: string,
    ): Promise<{ _id: string } | null> {
        return await friendSchema.findOne({ userId, sendRequests: { $in: [recipient] } });
    }

    public async checkAccepterExitsInListSenderRequest(
        userId: string,
        accepterId: string,
    ): Promise<{ _id: string } | null> {
        return await friendSchema.findOne({ userId, acceptRequests: { $in: [accepterId] } });
    }

    public async insertFieldsFriendRequest(senderId: string, recipientId: string): Promise<void> {
        await friendSchema.updateOne(
            { userId: senderId },
            {
                $push: { sendRequests: recipientId },
            },
            { new: true },
        );
        await friendSchema.updateOne(
            { userId: recipientId },
            {
                $push: { acceptRequests: senderId },
            },
            { new: true },
        );
    }

    public async insertFieldsFriendAccepter(senderId: string, accepterId: string): Promise<void> {
        await friendSchema.updateOne(
            { userId: senderId },
            {
                $push: { friends: accepterId },
                $pull: { acceptRequests: accepterId },
            },
            { new: true },
        );
        await friendSchema.updateOne(
            { userId: accepterId },
            {
                $push: { friends: senderId },
                $pull: { sendRequests: senderId },
            },
            { new: true },
        );
    }

    public async insertNewRecord(payload: IFriendEntity): Promise<IFriendEntity | null> {
        return await friendSchema.create(this.formatterObjectId(payload));
    }
}
