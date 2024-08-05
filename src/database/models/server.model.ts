import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IServerEntity } from '../entities/server.entity';

export class ServerModel implements IServerEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    ownerId: string;

    @IsArray()
    @IsNotEmpty()
    members: string[];

    @IsArray()
    @IsNotEmpty()
    channels: string[];

    @IsString()
    @IsOptional()
    thumbnail?: string;

    constructor(user: IServerEntity) {
        this.id = user.id;
        this.name = user.name;
        this.ownerId = user.ownerId;
        this.members = user.members;
        this.channels = user.channels;
        this.thumbnail = user.thumbnail;
    }
}
