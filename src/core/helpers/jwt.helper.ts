import jwt from 'jsonwebtoken';
import { environment } from '../configs/env.config';
export class JWTHelper {
    constructor() {}

    public generatePairToken<T extends Object>(payload: T): { accessToken: string; refreshToken: string } {
        return {
            accessToken: this.signatureToken(payload, environment.AUTH_PRIVATE_KEY || '', { expiresIn: '3days' }),
            refreshToken: this.signatureToken(payload, environment.AUTH_PUBLIC_KEY || '', { expiresIn: '30days' }),
        };
    }

    public signatureToken<T extends Object>(payload: T, signature: string, options?: jwt.SignOptions): string {
        return jwt.sign(payload, signature, options);
    }

    public verifyToken<T = any>(token: string): T {
        return {} as T;
    }
}
