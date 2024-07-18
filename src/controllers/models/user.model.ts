import { IsNotEmpty, IsUUID } from 'class-validator';

// region Create new user
type PostUserArg = {
    unVerifyAccountId: string;
};

export class PostNewUserModel {
    @IsUUID()
    @IsNotEmpty()
    unVerifyAccountId: string;

    constructor(user: PostUserArg) {
        this.unVerifyAccountId = user.unVerifyAccountId;
    }
}
