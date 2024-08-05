import { Required } from '@/core/decorators/validate-payload/index.decorator';
import AuthService from '@/services/auth.service';
import type { Request, Response } from 'express';
import {
    AuthenticationAccountModel,
    LoginModel,
    RegisterPayloadModel,
    SendVerificationCodeModel,
} from './models/auth.model';

export default class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    @Required(RegisterPayloadModel)
    public async register(req: Request, res: Response): Promise<Response> {
        const { email, password, name, dob } = req.body;
        const result = await this.authService.register({ email, password, name, dob });
        return res.status(result.status).json(result);
    }

    @Required(SendVerificationCodeModel)
    public async sendVerificationCode(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        const result = await this.authService.sendVerificationCode({ email });
        return res.status(result.status).json(result);
    }

    @Required(AuthenticationAccountModel)
    public async authenticationAccount(req: Request, res: Response): Promise<Response> {
        const { email, verificationCode } = req.body;
        const result = await this.authService.accountAuthentication({ email, verificationCode });
        return res.status(result.status).json(result);
    }

    @Required(LoginModel)
    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const result = await this.authService.login({ email, password });
        return res.status(result.status).json(result);
    }
}
