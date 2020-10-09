import socketIo, { Socket } from 'socket.io';
import { Application } from 'express';

import container from './inversify.config';
import SocketEvents from './constants/socket.events';
import { appPromise } from './index';
import { envConfig } from './config';
import { TYPES } from './services/types';
import { SeekersServiceInterface, VolunteersServiceInterface } from './interfaces';

appPromise.then(async (app: Application) => {
  const volunteerService = container.get<VolunteersServiceInterface>(TYPES.VolunteersService);
  const seekersService = container.get<SeekersServiceInterface>(TYPES.SeekersService);

  const server = app.listen(envConfig.PORT, () => {
    console.log(`Server listened on port ${envConfig.PORT}`);
  });

  const io = socketIo(server);

  io.on(SocketEvents.connection, (socket: Socket) => {
    console.log('connected');

    socket.on(SocketEvents.locations, async () => {
      const volunteersLocations = await volunteerService.getAllVolunteersLocation();
      const seekersLocations = await seekersService.getAllSeekers();

      io.sockets.emit(SocketEvents.locations, { volunteersLocations, seekersLocations });
    });

    socket.on(SocketEvents.disconnect, () => {
      console.log('disconnected');
    });
  });
});
