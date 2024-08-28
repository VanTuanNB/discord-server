import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

// region invite members
type TypePostInviteMembersServer = {
    serverId: string;
    recipients: string[];
};
export class PostInviteMembersServerModal implements TypePostInviteMembersServer {
    @IsArray()
    @IsNotEmpty()
    recipients: string[];

    @IsUUID()
    @IsNotEmpty()
    serverId: string;

    constructor(payload: TypePostInviteMembersServer) {
        this.recipients = payload.recipients;
        this.serverId = payload.serverId;
    }
}

// region invite members
type TypePostAcceptInvite = {
    inviteId: string;
};
export class PostAcceptInviteModel implements TypePostAcceptInvite {
    @IsUUID()
    @IsNotEmpty()
    inviteId: string;

    constructor(payload: TypePostAcceptInvite) {
        this.inviteId = payload.inviteId;
    }
}
