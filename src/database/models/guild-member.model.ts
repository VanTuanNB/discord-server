import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IGuildMemberEntity } from '../entities/guild-member.entity';

export class GuildMemberModel implements IGuildMemberEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    memberId: string;

    @IsUUID()
    @IsNotEmpty()
    serverId: string;

    @IsString()
    @IsNotEmpty()
    nickname: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: IGuildMemberEntity) {
        this.id = params.id;
        this.memberId = params.memberId;
        this.serverId = params.serverId;
        this.nickname = params.nickname;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
