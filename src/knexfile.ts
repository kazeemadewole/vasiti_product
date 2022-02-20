import type { Knex } from "knex";
import { Env } from './config/env';
import path from 'path'
import { UtilService } from "./utils/utilservice";

const env = Env.all();
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: 'jelani.db.elephantsql.com',
      user: 'fpaubmrk',
      password: 'a1phV2lmWyDtjAEcQpxer71VlICylxRb',
      database: 'fpaubmrk',
    },
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
