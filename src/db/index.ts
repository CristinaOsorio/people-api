import { Sequelize } from 'sequelize-typescript';
import { config, dialect } from '../config/db.config';
import Person from '../models/person.model';

class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connectToDatabase();
    }

    private async connectToDatabase() {
        this.sequelize = new Sequelize({
            database: config.DATABASE,
            username: config.USERNAME,
            password: config.PASSWORD,
            host: config.HOST,
            port: config.PORT,
            dialect: dialect,

            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle,
            },
            models: [Person],
        });

        await this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch((err) => {
                console.error('Unable to connect to the Database:', err);
            });
    }
}

export default Database;
