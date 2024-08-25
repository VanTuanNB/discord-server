import { ERequestHeaderFields } from '@/core/constants/index.constant';
import { Required } from '@/core/decorators/validate-payload/index.decorator';
import { FriendService } from '@/services/friend.service';
import type { Request, Response } from 'express';
import { PostFriendAccepterModel, PostFriendRequestModel } from './models/friend.model';

export default class FriendController {
    private friendService = new FriendService();
    constructor() {}

    @Required(PostFriendRequestModel)
    public async postInvitationFriend(req: Request, res: Response): Promise<Response> {
        const userId = req.headers[ERequestHeaderFields.USER_ID];
        const payload = Object.assign(req.body, { userId });
        const friendResponse = await this.friendService.postInvitationFriend(payload);
        return res.status(friendResponse.status).json(friendResponse);
    }

    @Required(PostFriendAccepterModel)
    public async postAcceptationFriend(req: Request, res: Response): Promise<Response> {
        const userId = req.headers[ERequestHeaderFields.USER_ID];
        const payload = Object.assign({}, req.body, { userId });
        const server = await this.friendService.postAcceptationFriend(payload);
        return res.status(server.status).json(server);
    }
}
