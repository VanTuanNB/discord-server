import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IGuildChannelEntity } from '../entities/guild-channel.entity';

export class GuildChannelModel implements IGuildChannelEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    serverId: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @IsUUID(4, {
        each: true,
    })
    @IsNotEmpty()
    channels: string[];

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: IGuildChannelEntity) {
        this.id = params.id;
        this.userId = params.userId;
        this.serverId = params.serverId;
        this.channels = params.channels;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
