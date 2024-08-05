import { ValidationError, validate } from 'class-validator';
import type { IMessageError } from '../interfaces/common.interface';
import { ResponseHandler } from '../models/response-handler.model';

export class ValidatorInput {
    public async validate(payload: any, isShowError = true): Promise<ResponseHandler<null> | null> {
        const validation = await validate(payload, {
            validationError: false,
            enableDebugMessages: true,
            strictGroups: true,
            forbidUnknownValues: true,
        });
        if (validation.length > 0) {
            const messageError = this.getMessageError(validation);
            return new ResponseHandler(400, false, 'BAD_REQUEST_PAYLOAD', null, isShowError ? messageError : undefined);
        }
        return null;
    }

    private getMessageError(errors: ValidationError[]): IMessageError[] {
        try {
            const [error] = errors;
            if (!error)
                return [
                    {
                        field: 'unknown',
                        message: 'Unkown error',
                    },
                ];
            const { constraints } = error;
            const firstKey = Object.keys(constraints as Object)[0];
            const message = (constraints as any)[firstKey];

            return [
                {
                    field: error.property,
                    message,
                },
            ];
        } catch (error) {
            return [
                {
                    field: 'unknown',
                    message: 'Unkown error',
                },
            ];
        }
    }
}
