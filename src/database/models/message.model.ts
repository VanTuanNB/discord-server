import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IMessageEntity } from '../entities/message.entity';

export class MessageModel implements IMessageEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsUUID()
    @IsNotEmpty()
    channelMessageId: string;

    @IsArray()
    @IsNotEmpty()
    reactions: string[];

    @IsArray()
    @IsNotEmpty()
    embeds: string[];

    @IsArray()
    @IsNotEmpty()
    attachments: string[];

    @IsArray()
    @IsNotEmpty()
    mentions: string[];

    @IsBoolean()
    @IsOptional()
    pinned?: boolean;

    @IsBoolean()
    @IsOptional()
    mentionEveryone?: boolean;

    @IsBoolean()
    @IsOptional()
    tts?: boolean;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: IMessageEntity) {
        this.id = params.id;
        this.author = params.author;
        this.content = params.content;
        this.channelMessageId = params.channelMessageId;
        this.reactions = params.reactions;
        this.embeds = params.embeds;
        this.attachments = params.attachments;
        this.mentions = params.mentions;
        this.pinned = params.pinned;
        this.mentionEveryone = params.mentionEveryone;
        this.tts = params.tts;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
