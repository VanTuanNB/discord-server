import type { IResponseServer } from '@/core/interfaces/common.interface';
import type { IUserEntity } from '@/core/interfaces/entities/user.entity';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ValidatorInput } from './common/validate.common';

export class UserModal extends ValidatorInput {
    @IsNotEmpty()
    @IsUUID()
    profileId: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    constructor(user: Omit<IUserEntity, 'id'>) {
        super();
        this.profileId = user.profileId;
        this.password = user.password;
    }

    public validator(): Promise<IResponseServer | null> {
        return this.validate({
            profileId: this.profileId,
            password: this.password,
        });
    }
}
