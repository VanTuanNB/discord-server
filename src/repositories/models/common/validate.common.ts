import { validate } from 'class-validator';
import { ResponseHandler } from './response-handler.common';

export class ValidatorInput {
    protected async validate(payload: any, isShowError = true) {
        const validation = await validate(payload, {
            enableDebugMessages: true,
            strictGroups: true,
            forbidUnknownValues: false,
        });
        if (validation.length > 0) {
            return new ResponseHandler(400, false, 'BAD_REQUEST_PAYLOAD', null, isShowError ? validation : undefined);
        }
        return null;
    }
}
