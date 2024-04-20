export class ResponseHandler<T = any> {
    public version = '1.0.0';
    constructor(
        public status: number,
        public isSuccess: boolean,
        public message: string,
        public data: T,
        public errors?: any,
    ) {}
}
