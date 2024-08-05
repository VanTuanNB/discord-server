import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IChannelMessageEntity } from '../entities/channel-message.entity';

export class ChannelMessageModel implements IChannelMessageEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    channelId: string;

    @IsUUID()
    @IsNotEmpty()
    messageId: string;

    @IsUUID()
    @IsNotEmpty()
    memberId: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: IChannelMessageEntity) {
        this.id = params.id;
        this.channelId = params.channelId;
        this.memberId = params.memberId;
        this.messageId = params.messageId;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
