export const environment = {
    MONGO_HOST_NAME: Bun.env.MONGO_HOST_NAME || 'mongo',
    MONGO_PORT: Bun.env.MONGO_PORT || 27017,
    MONGO_USER: Bun.env.MONGO_USER,
    MONGO_PASSWORD: Bun.env.MONGO_PASSWORD,
    MONGO_DB_NAME: Bun.env.MONGO_DB_NAME || 'discord-db',
    AUTH_PRIVATE_KEY: Bun.env.AUTH_PRIVATE_KEY,
    AUTH_PUBLIC_KEY: Bun.env.AUTH_PUBLIC_KEY,
    EMAIL_ADDRESS: Bun.env.EMAIl_ADDRESS,
    EMAIl_PASSCODE: Bun.env.EMAIl_PASSCODE,
};
