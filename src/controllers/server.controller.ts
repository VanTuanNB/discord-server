import { ERequestHeaderFields } from '@/core/constants/index.constant';
import { EModePayload, Required } from '@/core/decorators/validate-payload/index.decorator';
import ServerService from '@/services/server.service';
import { type Request, type Response } from 'express';
import { ParamHeaderRequiredModel } from './models/common.model';
import {
    ForceDeleteServiceParamModel,
    ForceDeleteServicePayloadModel,
    PostNewServerModal,
} from './models/server.model';

export default class ServerController {
    private serverService = new ServerService();
    constructor() {}

    public async getListServer(req: Request, res: Response): Promise<Response> {
        const servers = await this.serverService.getList();
        return res.status(servers.status).json(servers);
    }

    @Required(ParamHeaderRequiredModel, EModePayload.HEADERS)
    public async getListServerByUserId(req: Request, res: Response): Promise<Response> {
        const userId = req.headers[ERequestHeaderFields.USER_ID] as string;
        const servers = await this.serverService.getListByUserId(userId);
        return res.status(servers.status).json(servers);
    }

    @Required(ParamHeaderRequiredModel, EModePayload.HEADERS)
    @Required(PostNewServerModal)
    public async create(req: Request, res: Response): Promise<Response> {
        const userId = req.headers[ERequestHeaderFields.USER_ID];
        const payload = Object.assign({}, req.body, { userId });
        const server = await this.serverService.create(payload);
        return res.status(server.status).json(server);
    }

    @Required(ForceDeleteServicePayloadModel)
    @Required(ForceDeleteServiceParamModel, EModePayload.PARAMS)
    public async permanentlyDelete(req: Request, res: Response): Promise<Response> {
        const payload = Object.assign({ serverId: req.body.id }, req.body, req.params);
        const server = await this.serverService.permanentlyDelete(payload);
        return res.status(server.status).json(server);
    }
}
