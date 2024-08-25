import type { TypePostNewServer } from '@/controllers/models/server.model';

export type TypeForceDeleteServerServicePayload = {
    userId: string;
    serverId: string;
};

export type TypePostServerServicePayload = TypePostNewServer & {
    userId: string;
};

export type TypePostInviteMembers = {
    id: string;
    recipients: string[];
}