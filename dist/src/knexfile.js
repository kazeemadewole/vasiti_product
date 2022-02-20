"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const utilservice_1 = require("./utils/utilservice");
const env = env_1.Env.all();
const config = {
    development: {
        client: "pg",
        connection: {
            host: env.POSTGRES_HOST,
            user: env.POSTGRES_USER,
            password: env.POSTGRES_PASSWORD,
            database: env.POSTGRES_DATABASE
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: utilservice_1.UtilService.getFullPathFromRoot('src/migration'),
            tableName: 'vasity_product_migration',
            extension: 'ts',
        }
    },
};
module.exports = config;
