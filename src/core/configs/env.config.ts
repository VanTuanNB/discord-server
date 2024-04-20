export const environment = {
    MONGO_IP: process.env.MONGO_IP || 'mongo',
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_FOLDER: process.env.MONGO_FOLDER || 'discord-db',
    REDIS_URL: process.env.REDIS_URL || 'redis',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET,
};

export function mongoDbUrl(): string {
    if (process.env.NODE_ENV === 'production') {
        return `mongodb://${environment.MONGO_USER}:${environment.MONGO_PASSWORD}@${environment.MONGO_IP}:${environment.MONGO_PORT}/${environment.MONGO_FOLDER}`;
    } else {
        return 'mongodb://localhost:27017/discord-db';
    }
}
