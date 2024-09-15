import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import Routes from './routes';
import Database from './db';
import dotenv from 'dotenv';

dotenv.config();

export default class Server {
    constructor(app: Application) {
        this.config(app);
        this.syncDatabase();
        new Routes(app);
    }

    private config(app: Application): void {
        const allowedOrigins = [process.env.FRONTEND_URL];

        const corsOptions: CorsOptions = {
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
            optionsSuccessStatus: 200,
        };

        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
    }

    private syncDatabase(): void {
        const db = new Database();
        db.sequelize?.sync();
    }
}
