export type IConnectionEntity = {
    id: string;
    userId: string;
    type: string;
    revoke: boolean;
    isOffline?: boolean;
    isOnline?: boolean;
    createdAt?: string;
    updatedAt?: string;
};
