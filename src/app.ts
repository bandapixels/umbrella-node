import http from 'http';
import socketIo, { Socket } from 'socket.io';
import { Application, Request, Response } from 'express';

import container from './inversify.config';
import umbrellaLiveMap from './umbrellaLiveMap';
import { appPromise } from './index';
import { envConfig } from './config';
import { TYPES } from './services/types';
import { SeekersServiceInterface, VolunteersServiceInterface } from './interfaces';

appPromise.then(async (app: Application) => {
  const volunteerService = container.get<VolunteersServiceInterface>(TYPES.VolunteersService);
  const seekersService = container.get<SeekersServiceInterface>(TYPES.SeekersService);

  app.get('/', (req: Request, res: Response) => {
    res.send(umbrellaLiveMap);
  });

  const server = http.createServer(app);

  const io = socketIo(server);

  io.on('connection', (socket: Socket) => {
    console.log('connected');

    socket.on('locations', async () => {
      const volunteersLocations = await volunteerService.getAllVolunteersLocation();
      const seekersLocations = await seekersService.getAllSeekers();

      io.sockets.emit('locations', { volunteersLocations, seekersLocations });
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });

  server.listen(envConfig.PORT, () => {
    console.log(`Server listened on port ${envConfig.PORT}`);
  });
});
