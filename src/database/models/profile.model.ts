import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IProfileEntity } from '../entities/profile.entity';

export class ProfileModel implements IProfileEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    dob: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    avatar?: string;

    constructor(user: IProfileEntity) {
        this.id = user.id;
        this.userId = user.userId;
        this.name = user.name;
        this.dob = user.dob;
        this.email = user.email;
        this.avatar = user.avatar;
    }
}
