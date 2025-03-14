import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Post } from '../modules/post/entities/Post';
import { User } from '../modules/user/entities/User';


dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Post, User] 
});

AppDataSource.initialize()
    .then(() => console.log(`Database connected on port ${process.env.DB_PORT}`))
    .catch((error) => console.log('Error connecting to database', error));