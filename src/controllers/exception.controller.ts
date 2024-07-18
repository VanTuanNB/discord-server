import { ResponseHandler } from '@/core/models/response-handler.model';
import type { Request, Response } from 'express';

export default class ExceptionController {
    constructor() {}
    public async endpointException(req: Request, res: Response): Promise<Response> {
        const responseError = new ResponseHandler(404, false, 'Endpoint not found', null);
        return res.status(responseError.status).json(responseError);
    }
}
