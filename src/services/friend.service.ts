import { ValidatorInput } from '@/core/helpers/validate-input.helper';
import type { IResponseServer } from '@/core/interfaces/common.interface';
import { ResponseHandler } from '@/core/models/response-handler.model';
import { FriendModel } from '@/database/models/friend.model';
import { FriendRepository } from '@/repositories/friend.repository';
import UserRepository from '@/repositories/user.repository';
import { v4 as uuidV4 } from 'uuid';
import type { TypePostAcceptationFriendPayload, TypePostInvitationFriendPayload } from './models/friend.model';
export class FriendService {
    private validateInputService = new ValidatorInput();
    private userRepository = new UserRepository();
    private friendRepository = new FriendRepository();
    constructor() {}

    public async postInvitationFriend(payload: TypePostInvitationFriendPayload): Promise<IResponseServer> {
        try {
            const recipientUser = await this.userRepository.getById(payload.userId);
            if (!recipientUser)
                return new ResponseHandler(200, false, `Your friend request has been sent previously`, null);
            const isExitsListFriend = await this.friendRepository.checkRecipientExitsInListSenderRequest(
                payload.userId,
                payload.recipientId,
            );
            if (isExitsListFriend)
                return new ResponseHandler(200, true, `You have made friends with this person`, null);
            const senderRequestFriendRecord = await this.friendRepository.getByUserId(payload.userId);
            const recipientFriendRecord = await this.friendRepository.getByUserId(payload.recipientId);
            if (!senderRequestFriendRecord && !recipientFriendRecord) {
                const senderRequestInstance = new FriendModel({
                    id: uuidV4(),
                    userId: payload.userId,
                    sendRequests: [payload.recipientId],
                });
                await this.friendRepository.insertNewRecord(senderRequestInstance);
            }
            if (!recipientFriendRecord) {
                const recipientRequestInstance = new FriendModel({
                    id: uuidV4(),
                    userId: payload.recipientId,
                    acceptRequests: [payload.userId],
                });
                await this.friendRepository.insertNewRecord(recipientRequestInstance);
            }
            if (!senderRequestFriendRecord && !recipientFriendRecord)
                return new ResponseHandler(201, true, 'Send friend request successfully', null);
            await this.friendRepository.insertFieldsFriendRequest(payload.userId, payload.recipientId);
            return new ResponseHandler(201, true, 'Send friend request successfully', null);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async postAcceptationFriend(payload: TypePostAcceptationFriendPayload): Promise<IResponseServer> {
        try {
            console.log('payload', payload);
            const recipientUser = await this.userRepository.getById(payload.userId);
            if (!recipientUser)
                return new ResponseHandler(404, false, `Your friend request has been sent previously`, null);
            const isExitsListFriend = await this.friendRepository.checkAccepterExitsInListSenderRequest(
                payload.userId,
                payload.accepterId,
            );
            console.log('isExitsListFriend', isExitsListFriend);
            if (!isExitsListFriend)
                return new ResponseHandler(
                    404,
                    false,
                    `Could not find a friend request to make friends with that person`,
                    null,
                );
            await this.friendRepository.insertFieldsFriendAccepter(payload.userId, payload.accepterId);
            return new ResponseHandler(201, true, `Added friend successfully`, null);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
