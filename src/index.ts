import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify.config';

import { configFn, errConfigFn } from './config';
import './controllers/authController';
import './controllers/usersController';

export const appPromise = (async () => {
  await createConnection();

  const server = new InversifyExpressServer(container);

  const app = server
    .setConfig(configFn)
    .setErrorConfig(errConfigFn)
    .build();

  return app;
})();
