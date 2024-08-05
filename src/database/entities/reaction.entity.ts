export type IReactionEntity = {
    id: string;
    messageId: string;
    memberId: string;
    counter: number;
    emoji: string;
    createdAt?: string;
    updatedAt?: string;
};
