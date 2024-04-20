import { mongoDbUrl } from '@/core/configs/env.config';
import mongoose from 'mongoose';

export default class Database {
    public static async connect(): Promise<mongoose.mongo.Db> {
        try {
            mongoose.set('strictQuery', true);
            if (process.env.NODE_ENV === 'production') {
            }
            await mongoose.connect(mongoDbUrl(), {});
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
