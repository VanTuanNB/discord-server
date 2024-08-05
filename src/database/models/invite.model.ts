import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IInviteEntity } from '../entities/invite.entity';

export class InviteModel implements IInviteEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    sender: string;

    @IsUUID()
    @IsNotEmpty()
    receiver: string;

    @IsUUID()
    @IsNotEmpty()
    serverId: string;

    @IsString()
    @IsNotEmpty()
    expire: string;

    @IsString()
    @IsNotEmpty()
    createdAt?: string;

    @IsArray()
    @IsOptional()
    updatedAt?: string;

    constructor(params: IInviteEntity) {
        this.id = params.id;
        this.sender = params.sender;
        this.serverId = params.serverId;
        this.receiver = params.receiver;
        this.expire = params.expire;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
