import 'reflect-metadata';
import dotenv from 'dotenv';
import variableExpansion from 'dotenv-expand';
const myEnv = dotenv.config();
variableExpansion.expand(myEnv);
/**
 * cache ENV value, its faster!
 *
 */
const envGlobCache: { [x: string]: string } = {};

function getEnv(envKey: string) {
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

function getEnvString(envKey: string) {
  const val = getEnv(envKey);
  if (val) {
    return val;
  }
  return '';
}

function getEnvBool(envKey: string) {
  const val = getEnv(envKey);
  if (val !== undefined && String(val) === 'true') {
    return true;
  }
  return false;
}

function getEnvNumber(envKey: string, defaultVal?: number) {
  const val = getEnv(envKey);
  if (val !== undefined && !isNaN(Number(val))) {
    return Number(val);
  }
  return defaultVal as number;
}

type IEnvironment = 'production' | 'staging' | 'development' | 'test';

const config = {
  port: getEnvNumber('PORT'),
  environment: getEnvString('NODE_ENV') as IEnvironment,
  POSTGRES_HOST: getEnvString('POSTGRES_HOST'),
  POSTGRES_USER: getEnvString('POSTGRES_USER'),
  POSTGRES_DATABASE: getEnvString('POSTGRES_DATABASE'),
  POSTGRES_PASSWORD: getEnvString('POSTGRES_PASSWORD'),
} as const;

if (config.environment === 'development') {
  console.log({ config });
}

export class Env {
  static all() {
    return config;
  }
}
