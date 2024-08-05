import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IReactionEntity } from '../entities/reaction.entity';

export class ReactionModel implements IReactionEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    memberId: string;

    @IsUUID()
    @IsNotEmpty()
    messageId: string;

    @IsNumber()
    @IsNotEmpty()
    counter: number;

    @IsString()
    @IsNotEmpty()
    emoji: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: IReactionEntity) {
        this.id = params.id;
        this.memberId = params.memberId;
        this.messageId = params.messageId;
        this.counter = params.counter;
        this.emoji = params.emoji;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
