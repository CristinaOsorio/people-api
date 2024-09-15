import dotenv from 'dotenv';
dotenv.config();

export const config = {
    HOST: process.env.DB_HOST,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
    PORT: Number(process.env.DB_PORT),
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

export const dialect = 'mysql';
