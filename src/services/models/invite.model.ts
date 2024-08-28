export type TypePostInviteMembers = {
    serverId: string;
    recipients: string[];
    userId: string;
};

export type TypePostAcceptInvitation = {
    userId: string;
    inviteId: string;
};
