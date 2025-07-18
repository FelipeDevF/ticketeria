/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-import-module-exports */
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as entities from './src/entities';

dotenv.config();

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  entities,
  migrations: [`${__dirname}/src/database/migrations/*{.ts,.js}`],
  seeds: [`${__dirname}/src/database/**/*.seed{.ts,.js}`],
  factories: [`${__dirname}/src/database/**/*.factory{.ts,.js}`],
  maxQueryExecutionTime: 1000,
  cli: {
    migrationsDir: 'src/database/migrations',
  }
};
