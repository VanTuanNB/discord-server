export type IChannelEntity = {
    id: string;
    serverId: string;
    name: string;
    type: number;
    // recipients: string[];
    ownerId: string;
    topic?: string;
    lastMessage?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type IPermanentlyDeleteMultipleChannelModel = {
    serverId: string;
    channelIds: string[];
};
