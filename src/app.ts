import http from 'http';
import socketIo from 'socket.io';
import { Application } from 'express';

import { appPromise } from './index';
import { envConfig } from './config';

appPromise.then(async (app: Application) => {
  const server = http.createServer(app);

  const io = socketIo(server);

  server.listen(envConfig.PORT, () => {
    console.log(`Server listened on port ${envConfig.PORT}`);
  });
});
