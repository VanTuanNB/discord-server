import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import type { IUnVerifyAccountEntity } from '../entities/unverify-account.entity';

export class UnVerifyAccountModel implements IUnVerifyAccountEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    dob: string;

    @Min(6)
    @IsNumber()
    @IsNotEmpty()
    verificationCode: number;

    @IsString()
    @IsOptional()
    expiresTime: string;

    @IsBoolean()
    @IsNotEmpty()
    isVerified: boolean;

    constructor(user: IUnVerifyAccountEntity) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.dob = user.dob;
        this.verificationCode = user.verificationCode;
        this.expiresTime = user.expiresTime;
        this.isVerified = user.isVerified;
    }
}
