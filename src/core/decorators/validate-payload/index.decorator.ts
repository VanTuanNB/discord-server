import type { ClassType } from '@/core/@types';
import { ValidatorInput } from '@/core/helpers/validate-input.helper';
import type { NextFunction, Request, Response } from 'express';

const validatorInput = new ValidatorInput();

function Required<T>(model: ClassType<T>) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originMethod = descriptor.value;
        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            const modelInstance = new model(req.body);
            const invalid = await validatorInput.validate(modelInstance);
            if (invalid) return res.status(invalid.status).json(invalid);
            return originMethod.apply(this, [req, res, next]);
        };
    };
}

export { Required };
