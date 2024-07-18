export class ResponseHandler<T = any> {
    public version = '1.0.0';
    constructor(
        public status: number,
        public isSuccess: boolean,
        public message: string,
        public data: T,
        public errors?: any,
    ) {}

    public static InternalServer() {
        return {
            status: 500,
            isSuccess: false,
            message: 'INTERNAL_SERVER_ERROR',
            data: null,
            errors: null,
            version: '1.0.0',
        };
    }

    public static Unauthorized() {
        return {
            status: 401,
            isSuccess: false,
            message: 'UNAUTHORIZED',
            data: null,
            errors: null,
            version: '1.0.0',
        };
    }

    public static ForbiddenAccess() {
        return {
            status: 403,
            isSuccess: false,
            message: 'FORBIDDEN_ACCESS',
            data: null,
            errors: null,
            version: '1.0.0',
        };
    }
}
