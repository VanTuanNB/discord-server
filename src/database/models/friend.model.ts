import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IFriendEntity } from '../entities/friend.entity';

export class FriendModel implements IFriendEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @IsUUID()
    @IsOptional()
    friends?: string[];

    @IsArray()
    @IsUUID()
    @IsOptional()
    acceptRequests?: string[];

    @IsArray()
    @IsUUID()
    @IsOptional()
    sendRequests?: string[];

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: IFriendEntity) {
        this.id = params.id;
        this.userId = params.userId;
        this.friends = params.friends;
        this.acceptRequests = params.acceptRequests;
        this.sendRequests = params.sendRequests;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
