export const environment = {
    MONGO_HOST_NAME: Bun.env.MONGO_HOST_NAME || 'mongo',
    MONGO_PORT: Bun.env.MONGO_PORT || 27017,
    MONGO_USER: Bun.env.MONGO_USER,
    MONGO_PASSWORD: Bun.env.MONGO_PASSWORD,
    MONGO_DB_NAME: Bun.env.MONGO_DB_NAME || 'discord-db',
    // REDIS_URL: Bun.env.REDIS_URL || 'redis',
    // REDIS_PORT: Bun.env.REDIS_PORT || 6379,
    // SESSION_SECRET: Bun.env.SESSION_SECRET,
};
