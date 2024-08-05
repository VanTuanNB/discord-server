export interface IUserEntity {
    id: string;
    profileId: string;
    password: string;
    refreshToken: string;
    createdAt?: string;
    updatedAt?: string;
}
