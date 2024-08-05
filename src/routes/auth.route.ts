import AuthController from '@/controllers/auth.controller';
import { Router } from 'express';

const router: Router = Router();
const authControllerInstance = new AuthController();
router.route('/register').post(authControllerInstance.register.bind(authControllerInstance));
router.route('/send-verification-code').post(authControllerInstance.sendVerificationCode.bind(authControllerInstance));
router.route('/authentication-account').post(authControllerInstance.authenticationAccount.bind(authControllerInstance));
router.route('/login').post(authControllerInstance.login.bind(authControllerInstance));

export default router;
