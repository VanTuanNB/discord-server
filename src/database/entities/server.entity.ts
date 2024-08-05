export type IServerEntity = {
    id: string;
    name: string;
    ownerId: string;
    members: string[];
    channels: string[];
    thumbnail?: string;
    createdAt?: string;
    updatedAt?: string;
};
