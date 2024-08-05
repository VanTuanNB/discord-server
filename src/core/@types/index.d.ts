declare module 'bun' {
    interface Env {
        AWESOME: string;
    }
}

export interface ClassType<T = any> extends Function {
    new (...args: any[]): T;
}
