import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

type TypeGetListServerByUserId = {
    userId: string;
};
// region get list server
export type TypePostNewServer = {
    name: string;
    channels: ChannelDTO[];
    thumbnail?: string;
};

export class GetListServerByUserIdModel {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    constructor(params: TypeGetListServerByUserId) {
        this.userId = params.userId;
    }
}

// region create server

class ChannelDTO {
    @IsString()
    name: string;

    @IsNumber()
    type: number;

    constructor(params: { name: string; type: number }) {
        this.name = params.name;
        this.type = params.type;
    }
}

export class PostNewServerModal implements TypePostNewServer {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ChannelDTO)
    channels: ChannelDTO[];

    @IsString()
    @IsOptional()
    thumbnail?: string;
    constructor(payload: TypePostNewServer) {
        this.name = payload.name;
        this.channels = payload.channels.map((channel) => new ChannelDTO(channel));
        this.thumbnail = payload.thumbnail;
    }
}

// region invite members
type TypePostInviteMembersServer = {
    recipients: string[];
};
export class PostInviteMembersServerModal implements TypePostInviteMembersServer {
    @IsArray()
    @IsNotEmpty()
    recipients: string[];

    constructor(payload: TypePostInviteMembersServer) {
        this.recipients = payload.recipients;
    }
}

// reg

export class ForceDeleteServicePayloadModel {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    constructor(params: TypeGetListServerByUserId) {
        this.userId = params.userId;
    }
}

export class ForceDeleteServiceParamModel {
    @IsUUID()
    @IsNotEmpty()
    serverId: string;

    constructor(params: { serverId: string }) {
        this.serverId = params.serverId;
    }
}
