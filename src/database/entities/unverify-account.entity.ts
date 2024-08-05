export type IUnVerifyAccountEntity = {
    id: string;
    email: string;
    password: string;
    name: string;
    dob: string;
    verificationCode: number;
    isVerified: boolean;
    expiresTime: string;
    createdAt?: string;
    updatedAt?: string;
};
