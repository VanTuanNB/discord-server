import { JWTHelper } from '@/core/helpers/jwt.helper';
import { ValidatorInput } from '@/core/helpers/validate-input.helper';
import type { IResponseServer } from '@/core/interfaces/common.interface';
import { ResponseHandler } from '@/core/models/response-handler.model';
import { ProfileModel } from '@/database/models/profile.model';
import { UserModel } from '@/database/models/user.model';
import ProfileRepository from '@/repositories/profile.repository';
import UnVerifyAccountRepository from '@/repositories/unverify-account.repository';
import UserRepository from '@/repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

export default class UserService {
    private unVerifyAccountRepository = new UnVerifyAccountRepository();
    private userRepository = new UserRepository();
    private validateInputService = new ValidatorInput();
    private profileRepository = new ProfileRepository();
    private jwtHelper = new JWTHelper();
    constructor() {}

    public async getList(): Promise<IResponseServer> {
        try {
            const users = await this.userRepository.getList();
            return new ResponseHandler(201, true, 'POST_USER_SUCCESSFULLY', users);
        } catch (error) {
            return new ResponseHandler(500, false, 'INTERNAL_ERROR', null, error);
        }
    }

    public async getById(): Promise<IResponseServer> {
        try {
            const users = await this.userRepository.getList();
            return new ResponseHandler(201, true, 'POST_USER_SUCCESSFULLY', users);
        } catch (error) {
            return new ResponseHandler(500, false, 'INTERNAL_ERROR', null, error);
        }
    }

    public async createNewUser(unVerifyAccountId: string): Promise<IResponseServer> {
        try {
            const unVerifyAccount = await this.unVerifyAccountRepository.getById(unVerifyAccountId);
            if (!unVerifyAccount)
                return new ResponseHandler(
                    404,
                    false,
                    'ACCOUNT_NOT_FOUND',
                    null,
                    `The requested account dose not exist in the system.`,
                );
            if (!unVerifyAccount.isVerified) return new ResponseHandler(400, false, 'Account not verified', null);
            const userId = uuidv4();
            const profileId = uuidv4();
            const profileModel = new ProfileModel({
                id: profileId,
                name: unVerifyAccount.name,
                email: unVerifyAccount.email,
                userId: userId,
                dob: unVerifyAccount.dob,
            });
            const validationUser = await this.validateInputService.validate(profileModel);
            if (validationUser) return validationUser;
            const profileCreated = await this.profileRepository.create(profileModel);
            if (!profileCreated || !profileCreated.id)
                return new ResponseHandler(500, false, 'Can not create new profile', null);
            const { accessToken, refreshToken } = this.jwtHelper.generatePairToken({
                id: userId,
                email: unVerifyAccount.email,
                name: unVerifyAccount.name,
                profileId,
            });
            const userModel = new UserModel({
                id: userId,
                password: unVerifyAccount.password,
                profileId,
                refreshToken,
            });
            const newUser = await this.userRepository.create(userModel);
            if (!newUser || !newUser.id) {
                await this.profileRepository.permanentlyDelete(profileId);
                return new ResponseHandler(500, false, 'Can not create new user', null);
            }
            await this.unVerifyAccountRepository.permanentlyDelete(unVerifyAccount.id);
            return new ResponseHandler(201, true, 'Created new user successfully', { accessToken, refreshToken });
        } catch (error) {
            return new ResponseHandler(500, false, 'INTERNAL_ERROR', null, error);
        }
    }
}
