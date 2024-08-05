import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IConnectionEntity } from '../entities/connection.entity';

export class ConnectionModel implements IConnectionEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsBoolean()
    @IsNotEmpty()
    revoke: boolean;

    @IsBoolean()
    @IsOptional()
    isOffline?: boolean;

    @IsBoolean()
    @IsOptional()
    isOnline?: boolean;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    constructor(params: IConnectionEntity) {
        this.id = params.id;
        this.userId = params.userId;
        this.type = params.type;
        this.revoke = params.revoke;
        this.isOffline = params.isOffline;
        this.isOnline = params.isOnline;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
