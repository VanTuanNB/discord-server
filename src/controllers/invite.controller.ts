import { ERequestHeaderFields } from '@/core/constants/index.constant';
import { Required } from '@/core/decorators/validate-payload/index.decorator';
import { InviteService } from '@/services/invite.service';
import { type Request, type Response } from 'express';
import { PostAcceptInviteModel, PostInviteMembersServerModal } from './models/invite.model';

export class InviteController {
    private inviteService = new InviteService();
    constructor() {}

    @Required(PostInviteMembersServerModal)
    public async inviteMembers(req: Request, res: Response): Promise<Response> {
        const userId = req.headers[ERequestHeaderFields.USER_ID];
        const payload = { ...req.body, userId };
        const inviteMemberResponse = await this.inviteService.inviteMembers(payload);
        return res.status(inviteMemberResponse.status).json(inviteMemberResponse);
    }

    @Required(PostAcceptInviteModel)
    public async acceptTheInvitation(req: Request, res: Response): Promise<Response> {
        const userId = req.headers[ERequestHeaderFields.USER_ID];
        const payload = { ...req.body, userId };
        const acceptTheInvitation = await this.inviteService.acceptTheInvitation(payload);
        return res.status(acceptTheInvitation.status).json(acceptTheInvitation);
    }
}
