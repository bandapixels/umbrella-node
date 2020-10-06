import http from 'http';
import socketIo, { Socket } from 'socket.io';
import { Application, Request, Response } from 'express';

import container from './inversify.config';
import { appPromise } from './index';
import { envConfig } from './config';
import { TYPES } from './services/types';
import { VolunteersServiceInterface } from './interfaces';

appPromise.then(async (app: Application) => {
  const volunteerService = container.get<VolunteersServiceInterface>(TYPES.VolunteersService);

  app.get('/', (req: Request, res: Response) => {
    res.sendFile(`${__dirname}/index.html`);
  });

  const server = http.createServer(app);

  const io = socketIo(server);

  io.on('connection', (socket: Socket) => {
    console.log('connected');

    socket.on('locations', async () => {
      const locations = await volunteerService.getAllVolunteersLocation();
      io.sockets.emit('locations', locations);
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });

  server.listen(envConfig.PORT, () => {
    console.log(`Server listened on port ${envConfig.PORT}`);
  });
});
