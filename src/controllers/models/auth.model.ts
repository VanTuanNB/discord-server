import type { IUnVerifyAccountEntity } from '@/database/entities/unverify-account.entity';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// region Registration Account
type RegisterArgs = Pick<IUnVerifyAccountEntity, 'email' | 'name' | 'password' | 'dob'>;

export class RegisterPayloadModel {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    dob: string;

    constructor(user: RegisterArgs) {
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.dob = user.dob;
    }
}

// region Send Verification Code
type sendVerificationCodeArgs = {
    email: string;
    password: string;
};

export class SendVerificationCodeModel {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    constructor(user: sendVerificationCodeArgs) {
        this.email = user.email;
    }
}

// region Authentication Account
type AuthenticationAccountArgs = {
    email: string;
    verificationCode: number;
};

export class AuthenticationAccountModel implements AuthenticationAccountArgs {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    verificationCode: number;

    constructor(user: AuthenticationAccountArgs) {
        this.email = user.email;
        this.verificationCode = user.verificationCode;
    }
}

type LoginArgs = {
    email: string;
    password: string;
};

export class LoginModel implements LoginArgs {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    constructor(user: LoginArgs) {
        this.email = user.email;
        this.password = user.password;
    }
}
