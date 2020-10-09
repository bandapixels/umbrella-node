import 'dotenv/config';

import { EnvConfigInterface } from '../interfaces';

export const envConfig: EnvConfigInterface = {
  POSTGRES_PASSWORD: process.env.PGPASSWORD || 'secret',
  PGHOST: process.env.PGHOST || 'localhost',
  PGUSER: process.env.PGUSER || 'postgres',
  PGDATABASE: process.env.PGDATABASE || 'postgres',
  PGPASSWORD: process.env.PGPASSWORD || 'secret',
  PGPORT: Number.parseInt(process.env.PGPORT || '3300', 10),
  PORT: Number.parseInt(process.env.PORT || '3000', 10),
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'dff$asdcAs',
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
  API_URL: process.env.API_URL || 'http://localhost:3000',
};
