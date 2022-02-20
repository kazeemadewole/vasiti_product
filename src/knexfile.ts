import type { Knex } from "knex";
import { Env } from './config/env';
import path from 'path'
import { UtilService } from "./utils/utilservice";

const env = Env.all();
console.log(typeof env.POSTGRES_URL)
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      filename: env.POSTGRES_URL,
      password : 'fpaubmrk:a1phV2lmWyDtjAEcQpxer71VlICylxRb'
    } ,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory : UtilService.getFullPathFromRoot('src/migration'),
      tableName: 'vasity_product_migration',
      extension: 'ts',
    }
  },
};

module.exports = config;
