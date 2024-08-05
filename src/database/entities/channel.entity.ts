export type IChannelEntity = {
    id: string;
    serverId: string;
    name: string;
    type: number;
    topic: string;
    // recipients: string[];
    ownerId: string;
    lastMessage?: string;
    createdAt?: string;
    updatedAt?: string;
};
