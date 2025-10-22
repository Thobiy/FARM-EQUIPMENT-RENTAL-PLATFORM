import dotenv from 'dotenv';
dotenv.config();

export default {
    ENVIRONMENT: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 3000,
    Database_NAME: process.env.DATABASE_NAME || 'farm_rental',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'root',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'Congratulation@4508',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_PORT: Number(process.env.DATABASE_PORT || 3306),
    DATABASE_DIALECT: process.env.DATABASE_DIALECT || mysql,
    
}