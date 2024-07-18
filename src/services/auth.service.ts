import { JWTHelper } from '@/core/helpers/jwt.helper';
import { ValidatorInput } from '@/core/helpers/validate-input.helper';
import type { IResponseServer } from '@/core/interfaces/common.interface';
import { ResponseHandler } from '@/core/models/response-handler.model';
import type { IUnVerifyAccountEntity } from '@/database/entities/unverify-account.entity';
import { UnVerifyAccountModel } from '@/database/models/unverify-account.model';
import ProfileRepository from '@/repositories/profile.repository';
import UnVerifyAccountRepository from '@/repositories/unverify-account.repository';
import UserRepository from '@/repositories/user.repository';
import bcrypt from 'bcrypt';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';
import { CommonService } from './common.service';
import UserService from './user.service';

export default class AuthService {
    private unVerifyAccountService = new UnVerifyAccountRepository();
    private validateInputService = new ValidatorInput();
    private commonService = new CommonService();
    private userService = new UserService();
    private jwtHelper = new JWTHelper();
    private userRepository = new UserRepository();
    private profileRepository = new ProfileRepository();
    constructor() {}

    public async register(
        payload: Pick<IUnVerifyAccountEntity, 'email' | 'password' | 'name' | 'dob'>,
    ): Promise<IResponseServer> {
        try {
            const account = await this.unVerifyAccountService.getByEmail(payload.email);
            if (account) {
                return new ResponseHandler(200, true, 'Get info un verify account successfully', {
                    id: account.id,
                    email: account.email,
                    name: account.name,
                    dob: account.dob,
                });
            }
            const id = uuidv4();
            const hashPassword = await bcrypt.hash(payload.password, 10);
            const randomCode: number = Math.floor(Math.random() * 10000);
            const verificationCode = randomCode < 1000 ? randomCode * 10 : randomCode;
            const newUnVerifyAccountModel = new UnVerifyAccountModel({
                id,
                email: payload.email.trim(),
                name: payload.name.trim(),
                dob: payload.dob,
                password: hashPassword,
                verificationCode: verificationCode,
                expiresTime: moment().add('minutes', 2).format(),
                isVerified: false,
            });
            const validation = await this.validateInputService.validate(newUnVerifyAccountModel);
            if (validation) return validation;
            const newAccount = await this.unVerifyAccountService.create(newUnVerifyAccountModel);
            if (!newAccount) return new ResponseHandler(500, false, 'Can not create new un verify account', null);
            this.commonService.sendMail({
                to: payload.email,
                message: `Your verification code is <b>${verificationCode}</b>`,
                subject: 'Discord want verify your account',
            });
            return new ResponseHandler(201, true, 'Create new un verify account successfully', {
                id: newAccount.id,
                email: newAccount.email,
                name: newAccount.name,
                dob: newAccount.dob,
            });
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async sendVerificationCode(payload: Pick<IUnVerifyAccountEntity, 'email'>): Promise<IResponseServer> {
        try {
            const unVerifyAccount = await this.unVerifyAccountService.getByEmail(payload.email);
            if (!unVerifyAccount) {
                return new ResponseHandler(
                    404,
                    false,
                    'Account not found',
                    null,
                    `The requested user with email "${payload.email}" dose not exist in the system.`,
                );
            }
            const randomCode: number = Math.floor(Math.random() * 10000);
            const verificationCode = randomCode < 1000 ? randomCode * 10 : randomCode;
            const expiresTime: string = moment().add('minute', 2).format();
            console.log(
                `{
                ...unVerifyAccount,
                verificationCode,
                expiresTime,
            })`,
                {
                    ...unVerifyAccount,
                    verificationCode,
                    expiresTime,
                },
            );
            await this.unVerifyAccountService.update({
                ...unVerifyAccount,
                verificationCode,
                expiresTime,
            });
            this.commonService.sendMail({
                message: `Your verification code is <b>${verificationCode}</b>`,
                subject: 'Discord want verify your account',
                to: payload.email,
            });
            return new ResponseHandler(200, true, 'Send verification code successfully', null, '');
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async accountAuthentication(
        payload: Pick<IUnVerifyAccountEntity, 'email' | 'verificationCode'>,
    ): Promise<IResponseServer> {
        try {
            const unVerifyAccount = await this.unVerifyAccountService.getByEmail(payload.email);
            if (!unVerifyAccount)
                return new ResponseHandler(
                    404,
                    false,
                    'ACCOUNT_NOT_FOUND',
                    null,
                    `The requested user with email "${payload.email}" dose not exist in the system.`,
                );
            if (payload.verificationCode !== unVerifyAccount.verificationCode)
                return new ResponseHandler(
                    400,
                    false,
                    'Verification code dose not match',
                    null,
                    `Verification code does not match`,
                );
            const isExpiredTime = moment().isAfter(moment(unVerifyAccount.expiresTime));
            if (isExpiredTime) return new ResponseHandler(403, false, 'A verification code is expired time', null);
            await this.unVerifyAccountService.update({ ...unVerifyAccount, isVerified: true });
            return await this.userService.createNewUser(unVerifyAccount.id);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async login(payload: Pick<IUnVerifyAccountEntity, 'email' | 'password'>): Promise<IResponseServer> {
        try {
            const user = await this.userRepository.getByEmail(payload.email);
            if (!user)
                return new ResponseHandler(
                    404,
                    false,
                    'USER_NOT_FOUND',
                    null,
                    `The requested user with email "${payload.email}" dose not exist in the system.`,
                );
            const profile = await this.profileRepository.getById(user.profileId);
            if (!profile)
                return new ResponseHandler(
                    404,
                    false,
                    'PROFILE_NOT_FOUND',
                    null,
                    `The requested profile dose not exist in the system.`,
                );
            const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
            if (!isPasswordMatched)
                return new ResponseHandler(401, false, 'Authentication Failed', null, `Incorrect email or password`);

            const { accessToken, refreshToken } = this.jwtHelper.generatePairToken({
                id: user.id,
                email: profile.email,
                name: profile.name,
                profileId: profile.id,
            });
            console.log('user', user);
            const updatedUser = await this.userRepository.update({ ...user, refreshToken });
            if (!updatedUser) ResponseHandler.InternalServer();
            return new ResponseHandler(200, true, 'Login successfully', {
                accessToken,
                refreshToken,
            });
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
