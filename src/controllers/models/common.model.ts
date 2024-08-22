import { IsNotEmpty, IsUUID } from 'class-validator';

type TypeParamHeaderRequired = {
    'dis-user-id': string;
};

export class ParamHeaderRequiredModel implements TypeParamHeaderRequired {
    @IsUUID()
    @IsNotEmpty()
    'dis-user-id': string;
    constructor(payload: TypeParamHeaderRequired) {
        this['dis-user-id'] = payload['dis-user-id'];
    }
}
