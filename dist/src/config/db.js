"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectionModel = exports.db = void 0;
const objection_1 = require("objection");
const knex_1 = __importDefault(require("knex"));
const env_1 = require("./env");
// Initialize knex.
const env = env_1.Env.all().environment;
const config = require('../knexfile')[env];
const db = (0, knex_1.default)(config);
exports.db = db;
// Give the knex instance to objection.
objection_1.Model.knex(db);
exports.ObjectionModel = objection_1.Model;
