import { Model } from 'objection';
import knex from 'knex';
import { Env } from './env';

// Initialize knex.
const env = Env.all().environment;
const config = require('../knexfile')[env];
const db = knex(config);
export { db };

// Give the knex instance to objection.
Model.knex(db);
export const ObjectionModel = Model;