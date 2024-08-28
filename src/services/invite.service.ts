import { ValidatorInput } from '@/core/helpers/validate-input.helper';
import type { IResponseServer } from '@/core/interfaces/common.interface';
import { ResponseHandler } from '@/core/models/response-handler.model';
import { InviteModel } from '@/database/models/invite.model';
import { FriendRepository } from '@/repositories/friend.repository';
import { GuildChannelRepository } from '@/repositories/guild-channel.repository';
import { InviteRepository } from '@/repositories/invite.repository';
import { ServerRepository } from '@/repositories/server.repository';
import moment from 'moment-timezone';
import { v4 as uuidV4 } from 'uuid';
import type { TypePostAcceptInvitation, TypePostInviteMembers } from './models/invite.model';

export class InviteService {
    private serverRepository = new ServerRepository();
    private guildChannelRepository = new GuildChannelRepository();
    private friendRepository = new FriendRepository();
    private inviteRepository = new InviteRepository();
    private validateInputService = new ValidatorInput();

    constructor() {}

    public async inviteMembers(payload: TypePostInviteMembers): Promise<IResponseServer> {
        try {
            // get friends of user -> request friendIds -> if friendId exits server -> by pass -> else -> send invite to server
            const { recipients, serverId, userId } = payload;
            const server = await this.serverRepository.getById(serverId);
            if (!server) return new ResponseHandler(404, false, 'Server not found', null);
            const isRecipientsHaveUserListFriend = await this.friendRepository.checkListFriendByUserId(
                userId,
                recipients,
            );
            if (!isRecipientsHaveUserListFriend)
                return new ResponseHandler(
                    404,
                    false,
                    'The recipient of the invitation is not in your friends list',
                    null,
                );
            const inviteExisted = await this.inviteRepository.checkExitsInvite(userId, serverId);
            if (inviteExisted) {
                await this.inviteRepository.updateRecord({
                    queryFieldName: 'sender',
                    queryFieldValue: userId,
                    updateQuery: {
                        $addToSet: { receivers: { $each: recipients } },
                    },
                });
                return new ResponseHandler(200, true, 'Send invite to this server successfully', null);
            }
            const inviteModel = new InviteModel({
                id: uuidV4(),
                sender: userId,
                receivers: recipients,
                expire: moment().add(30, 'days').format(),
                serverId,
            });
            const isInvalid = await this.validateInputService.validate(inviteModel);
            if (isInvalid) return isInvalid;
            const insertInvited = await this.inviteRepository.insert(inviteModel);
            return new ResponseHandler(201, true, 'Send invite to this server successfully', insertInvited);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async acceptTheInvitation(payload: TypePostAcceptInvitation): Promise<ResponseHandler> {
        try {
            const { userId, inviteId } = payload;
            const inviteRecord = await this.inviteRepository.getById(inviteId);
            console.log('inviteRecord', inviteRecord);
            if (!inviteRecord) return new ResponseHandler(404, false, 'Invalid invite', null);
            // tiep tuc lam chuc nang accept invite -> check co userId ben trong invite hay khong -> neu co thi move no sang members cua  server
            return new ResponseHandler(201, true, 'Accept to member into this server successfully', inviteRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
