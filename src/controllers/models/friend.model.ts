import { IsNotEmpty, IsUUID } from 'class-validator';

type TypePostFriendRequestModel = {
    recipientId: string;
};

export class PostFriendRequestModel implements TypePostFriendRequestModel {
    @IsUUID()
    @IsNotEmpty()
    recipientId: string;

    constructor(payload: TypePostFriendRequestModel) {
        this.recipientId = payload.recipientId;
    }
}

// accepter
type TypePostFriendAccepterModel = {
    accepterId: string;
};

export class PostFriendAccepterModel implements TypePostFriendAccepterModel {
    @IsUUID()
    @IsNotEmpty()
    accepterId: string;

    constructor(payload: TypePostFriendAccepterModel) {
        this.accepterId = payload.accepterId;
    }
}
