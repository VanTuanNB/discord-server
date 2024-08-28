import type { IInviteEntity } from '@/database/entities/invite.entity';
import inviteSchema from '@/database/schemas/invite.schema';
import type { UpdateQuery } from 'mongoose';
import { BaseRepository } from './base.repository';

type TypeOptionUpdateRecord = {
    queryFieldName: string;
    queryFieldValue: string;
    updateQuery: UpdateQuery<IInviteEntity & { _id: string }>;
};

export class InviteRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getById(id: string): Promise<IInviteEntity | null> {
        return await inviteSchema.findById(id);
    }

    public async checkExitsInvite(userId: string, serverId: string): Promise<{ _id: string } | null> {
        return await inviteSchema.findOne({ senderId: userId, serverId });
    }

    public async insert(payload: IInviteEntity): Promise<IInviteEntity | null> {
        return await inviteSchema.create(this.formatterObjectId(payload));
    }

    public async insertFieldReceivers(payload: IInviteEntity): Promise<IInviteEntity | null> {
        return await inviteSchema.create(this.formatterObjectId(payload));
    }

    public async updateRecord(options: TypeOptionUpdateRecord): Promise<IInviteEntity | null> {
        const { queryFieldName, queryFieldValue, updateQuery } = options;
        return await inviteSchema.findOneAndUpdate({ [queryFieldName]: queryFieldValue }, updateQuery);
    }

    public async permanentlyDelete(inviteId: string) {
        return await inviteSchema.findOneAndDelete({ _id: inviteId });
    }
}
