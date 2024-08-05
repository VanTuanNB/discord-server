import ServerService from '@/services/server.service';
import { type Request, type Response } from 'express';

export default class ServerController {
    private serverService = new ServerService();
    constructor() {}

    public async getListServer(req: Request, res: Response): Promise<Response> {
        const servers = await this.serverService.getList();
        return res.status(servers.status).json(servers);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const server = await this.serverService.create();
        return res.status(server.status).json(server);
    }
}
