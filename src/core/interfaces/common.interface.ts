export interface IResponseServer<T = any> {
    isSuccess: boolean;
    status: number;
    data: T;
    message: string;
    version: string;
}

export type IMessageError = {
    field: string;
    message: string;
};
