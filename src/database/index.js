import { Sequelize } from 'sequelize'
export const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'DB_RH',
    host: process.env.DB_HOST,
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
        useUTC: false,
        options: {
            useUTC: false,
            requestTimeout: 100000,
        },
    },
    timezone: '-03:00',
})
