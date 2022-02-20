"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const myEnv = dotenv_1.default.config();
dotenv_expand_1.default.expand(myEnv);
/**
 * cache ENV value, its faster!
 *
 */
const envGlobCache = {};
function getEnv(envKey) {
    if (envGlobCache[envKey] !== undefined) {
        return envGlobCache[envKey];
    }
    const newEnv = process.env[envKey];
    if (newEnv !== undefined) {
        envGlobCache[envKey] = newEnv;
        return newEnv;
    }
    return undefined;
}
function getEnvString(envKey) {
    const val = getEnv(envKey);
    if (val) {
        return val;
    }
    return '';
}
function getEnvBool(envKey) {
    const val = getEnv(envKey);
    if (val !== undefined && String(val) === 'true') {
        return true;
    }
    return false;
}
function getEnvNumber(envKey, defaultVal) {
    const val = getEnv(envKey);
    if (val !== undefined && !isNaN(Number(val))) {
        return Number(val);
    }
    return defaultVal;
}
const config = {
    port: getEnvNumber('PORT'),
    environment: getEnvString('NODE_ENV'),
    POSTGRES_HOST: getEnvString('POSTGRES_HOST'),
    POSTGRES_USER: getEnvString('POSTGRES_USER'),
    POSTGRES_DATABASE: getEnvString('POSTGRES_DATABASE'),
    POSTGRES_PASSWORD: getEnvString('POSTGRES_PASSWORD'),
};
if (config.environment === 'development') {
    console.log({ config });
}
class Env {
    static all() {
        return config;
    }
}
exports.Env = Env;
