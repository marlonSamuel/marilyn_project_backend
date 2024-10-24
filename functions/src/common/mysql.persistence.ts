import mysql from 'mysql2';

import {Sequelize} from 'sequelize';
export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    timezone: '-06:00',
    logging: false,
    pool: {
        max: 200,
        min:0,
        acquire: 30000,
        idle: 30000
    }
});