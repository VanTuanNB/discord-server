import { IsBase64, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import type { IUserEntity } from '../entities/user.entity';

export class UserModel implements IUserEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    profileId: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBase64()
    @IsNotEmpty()
    refreshToken: string;

    constructor(user: IUserEntity) {
        this.id = user.id;
        this.profileId = user.profileId;
        this.password = user.password;
        this.refreshToken = user.refreshToken;
    }
}
