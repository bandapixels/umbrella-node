import { envConfig } from './src/config';

export = {
  type: 'postgres',
  host: envConfig.PGHOST,
  port: envConfig.PGPORT,
  username: envConfig.PGUSER,
  password: envConfig.POSTGRES_PASSWORD,
  database: envConfig.PGDATABASE,
  synchronize: false,
  logging: true,
  seeds: [
    './seeds/**/*.ts',
  ],
  factories: [
    './src/factories/**/*.ts',
  ],
  entities: [
    './src/entity/**/*.ts',
  ],
  migrations: [
    'migration/**/*.ts',
  ],
  subscribers: [
    './src/subscriber/**/*.ts',
  ],
  cli: {
    entitiesDir: './src/entity',
    migrationsDir: 'migration',
    subscribersDir: './src/subscriber',
  },
};
