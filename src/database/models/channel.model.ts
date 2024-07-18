import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IChannelEntity } from '../entities/channel.entity';

export class ChannelModel implements IChannelEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    type: number;

    @IsString()
    @IsNotEmpty()
    topic: string;

    @IsUUID()
    @IsNotEmpty()
    serverId: string;

    @IsUUID()
    @IsNotEmpty()
    ownerId: string;

    @IsArray()
    @IsNotEmpty()
    recipients: string[];

    @IsArray()
    @IsOptional()
    lastMessage?: string;

    constructor(channel: IChannelEntity) {
        this.id = channel.id;
        this.name = channel.name;
        this.serverId = channel.serverId;
        this.ownerId = channel.ownerId;
        this.type = channel.type;
        this.topic = channel.topic;
        this.recipients = channel.recipients;
        this.lastMessage = channel.lastMessage;
    }
}
