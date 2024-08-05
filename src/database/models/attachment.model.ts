import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import type { IAttachmentEntity } from '../entities/attachment.entity';

export class AttachmentModel implements IAttachmentEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    fileName: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    size: number;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    proxyUrl: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    constructor(params: IAttachmentEntity) {
        this.id = params.id;
        this.fileName = params.fileName;
        this.title = params.title;
        this.size = params.size;
        this.url = params.url;
        this.proxyUrl = params.proxyUrl;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
