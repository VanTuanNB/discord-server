export type IInviteEntity = {
    id: string;
    sender: string;
    receivers: string[];
    serverId: string;
    expire: string;
    createdAt?: string;
    updatedAt?: string;
};
