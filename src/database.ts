import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    'passport',  // database
    'root',  // username
    '', // password
    {
        host: 'localhost', // host
        dialect: 'mysql',
        pool:{
            max: 5, // max of concurrent connections
            min: 0, // min of concurrent connectinos
            acquire: 30000, // max time in ms for to try connect before throwing an error
            idle: 10000 // max time that connection can idle in ms before close,
        },
        logging: false // echo of opeartions 
    },             
);