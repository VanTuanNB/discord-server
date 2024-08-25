import { ValidatorInput } from '@/core/helpers/validate-input.helper';
import type { IResponseServer } from '@/core/interfaces/common.interface';
import { ResponseHandler } from '@/core/models/response-handler.model';
import { ChannelModel } from '@/database/models/channel.model';
import { GuildChannelModel } from '@/database/models/guild-channel.model';
import { ServerModel } from '@/database/models/server.model';
import { ChannelRepository } from '@/repositories/channel.repository';
import { GuildChannelRepository } from '@/repositories/guild-channel.repository';
import { ServerRepository } from '@/repositories/server.repository';
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import type {
    TypeForceDeleteServerServicePayload,
    TypePostInviteMembers,
    TypePostServerServicePayload,
} from './models/server.model';

export default class ServerService {
    private serverRepository = new ServerRepository();
    private channelRepository = new ChannelRepository();
    private guildChannelRepository = new GuildChannelRepository();
    private validateInputService = new ValidatorInput();

    constructor() {}

    public async getList(): Promise<IResponseServer> {
        try {
            const servers = await this.serverRepository.getList();
            return new ResponseHandler(200, true, 'Get list servers successfully', servers);
        } catch (error) {
            return ResponseHandler.InternalServer();
        }
    }

    public async getListByUserId(userId: string): Promise<IResponseServer> {
        try {
            const servers = await this.serverRepository.getListPopulates(userId);
            if (!servers) return new ResponseHandler(404, false, 'Server not found', []);
            console.log('servers', servers);
            // const newData = await this.serverRepository.getPopulation();
            return new ResponseHandler(200, true, 'Get list servers successfully', servers);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async create(payload: TypePostServerServicePayload): Promise<IResponseServer> {
        try {
            const serverId = uuidV4();
            const channels = payload.channels.map(
                (channel) =>
                    new ChannelModel({
                        id: uuidV4(),
                        name: channel.name,
                        type: channel.type,
                        topic: '',
                        serverId,
                        ownerId: payload.userId,
                    }),
            );
            const createChannelRecords = await this.channelRepository.insertMultiple(channels);
            if (!createChannelRecords) return ResponseHandler.InternalServer();
            const channelIds = channels.map((channel) => channel.id);
            const guildChannelInstance = new GuildChannelModel({
                id: uuidV4(),
                serverId,
                userId: payload.userId,
                channels: channelIds,
            });
            const invalidGuildChannelModel = await this.validateInputService.validate(guildChannelInstance);
            if (invalidGuildChannelModel) {
                await this.channelRepository.permanentlyDeleteMultiple({
                    serverId,
                    channelIds: channelIds,
                });
                return invalidGuildChannelModel;
            }
            const guildChannelCreated = await this.guildChannelRepository.insert(guildChannelInstance);
            if (!guildChannelCreated) {
                await this.channelRepository.permanentlyDeleteMultiple({
                    serverId,
                    channelIds: channelIds,
                });
                return ResponseHandler.InternalServer();
            }
            const serverInstance = new ServerModel({
                id: serverId,
                name: payload.name,
                ownerId: payload.userId,
                members: [payload.userId],
                guildChannel: guildChannelCreated.id,
            });
            const invalidServerModel = await this.validateInputService.validate(serverInstance);
            if (invalidServerModel) {
                await this.channelRepository.permanentlyDeleteMultiple({
                    serverId,
                    channelIds: channelIds,
                });
                await this.guildChannelRepository.permanentlyDelete(guildChannelInstance.id);
                return invalidServerModel;
            }
            const serverDataCreated = await this.serverRepository.create(serverInstance);
            return new ResponseHandler(201, true, 'Created server successfully', serverDataCreated);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async inviteMembers(payload: TypePostInviteMembers): Promise<IResponseServer> {
        try {
            // get friends of user -> request friendIds -> if friendId exits server -> by pass -> else -> send invite to server
            const { recipients, id } = payload;
            console.log('uuid', uuidV4());
            console.log('await bcrypt.hash(payload.password, 10);', await bcrypt.hash('phatcana111', 10));
            const server = await this.serverRepository.getById(id);
            console.log('server', server);
            return ResponseHandler.Unauthorized();
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async permanentlyDelete(payload: TypeForceDeleteServerServicePayload): Promise<IResponseServer> {
        try {
            const serverDeleted = await this.serverRepository.permanentlyDelete(payload.serverId);
            if (!serverDeleted) {
                return new ResponseHandler(404, false, `Server not found with ownerId: ${payload.userId}`, null);
            }
            return new ResponseHandler(200, true, 'Deleted server successfully', serverDeleted);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
