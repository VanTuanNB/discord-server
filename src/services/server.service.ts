import type { IResponseServer } from '@/core/interfaces/common.interface';
import { ResponseHandler } from '@/core/models/response-handler.model';
import { ServerRepository } from '@/repositories/server.repository';
import { v4 as uuidV4 } from 'uuid';

export default class ServerService {
    private serverRepository = new ServerRepository();

    constructor() {}

    public async getList(): Promise<IResponseServer> {
        try {
            const servers = await this.serverRepository.getList();
            return new ResponseHandler(200, true, 'Get list servers successfully', servers);
        } catch (error) {
            return ResponseHandler.InternalServer();
        }
    }

    public async create(): Promise<IResponseServer> {
        try {
            const id = uuidV4();
            const hardCode = {
                id,
                name: 'Test Server',
                ownerId: 'def7b200-9487-4066-91e1-f40b5d14c14f',
                members: ['def7b200-9487-4066-91e1-f40b5d14c14f'],
                channels: ['def7b200-9487-4066-91e1-f40b5d14c14f'],
            };
            const server = await this.serverRepository.create(hardCode);
            return new ResponseHandler(201, true, 'Create new server successfully', server);
        } catch (error) {
            return ResponseHandler.InternalServer();
        }
    }
}
