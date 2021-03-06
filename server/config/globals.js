import {config} from 'dotenv';
config();

// Environment variables imported from .env file
export const env = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	NODE_PORT: process.env.NODE_PORT,
    NODE_CONNECTION: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}`,
	LOGIN_TOKEN: process.env.LOGIN_TOKEN,
};
