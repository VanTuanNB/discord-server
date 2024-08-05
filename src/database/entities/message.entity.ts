export type IMessageEntity = {
    id: string;
    author: string;
    content: string;
    channelMessageId: string;
    reactions: string[];
    embeds: string[];
    attachments: string[];
    mentions: string[];
    pinned?: boolean;
    mentionEveryone?: boolean;
    tts?: boolean;
    createdAt?: string;
    updatedAt?: string;
};
