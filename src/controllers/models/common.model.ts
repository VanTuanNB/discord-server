import type { ERequestHeaderFields } from '@/core/constants/index.constant';
import { IsNotEmpty, IsUUID } from 'class-validator';

type TypeParamHeaderRequired = {
    [ERequestHeaderFields.USER_ID]: string;
};

export class ParamHeaderRequiredModel implements TypeParamHeaderRequired {
    @IsUUID()
    @IsNotEmpty()
    'dis-user-id': string;
    constructor(payload: TypeParamHeaderRequired) {
        this['dis-user-id'] = payload['dis-user-id'];
    }
}
