import { environment } from '@/core/configs/env.config';
import mongoose from 'mongoose';

export default class Database {
    constructor() {}
    public static async connect(): Promise<mongoose.mongo.Db> {
        try {
            mongoose.set('strictQuery', true);
            const url = `mongodb+srv://${environment.MONGO_USER}:${environment.MONGO_PASSWORD}@${environment.MONGO_HOST_NAME}/`;
            await mongoose.connect(url, {
                dbName: 'discord-db',
                serverApi: { version: '1', deprecationErrors: true, strict: true },
                retryWrites: true,
                w: 'majority',
            });
            await mongoose.connection.db.admin().command({ ping: 1 });
            console.log('Connected database successfully!!!');
            return mongoose.connection.db;
        } catch (error) {
            console.log('Failed to connect to database!!!');
            this.disconnect();
            return mongoose.connection.db;
        }
    }

    public static async disconnect(): Promise<void> {
        try {
            mongoose.connection.close();
            mongoose.disconnect();
            console.log('Disconnected from the database!');
        } catch (error) {
            console.log('Fail to disconnect from the database!');
        }
    }
}
