import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IEmojiEntity } from '../entities/emoji.entity';

export class EmojiModel implements IEmojiEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsBoolean()
    @IsNotEmpty()
    isAnimated: boolean;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: IEmojiEntity) {
        this.id = params.id;
        this.name = params.name;
        this.code = params.code;
        this.url = params.url;
        this.isAnimated = params.isAnimated;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
