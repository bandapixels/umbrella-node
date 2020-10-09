import io from 'socket.io-client';
import { inject } from 'inversify';
import { JsonResult } from 'inversify-express-utils/dts/results';
import {
  controller,
  httpGet,
  httpPatch,
  httpDelete,
  requestParam,
  BaseHttpController,
  requestBody,
} from 'inversify-express-utils';

import SocketEvents from '../constants/socket.events';
import { envConfig } from '../config';
import { TYPES } from '../services/types';
import { passportAuthMiddleware } from '../config/passport.config';
import { Seeker } from '../models';

import {
  SeekersServiceInterface,
  UsersServiceInterface,
  VolunteersServiceInterface,
} from '../interfaces';

@controller('/seekers', passportAuthMiddleware)
export class SeekersController extends BaseHttpController {
  @inject(TYPES.UsersService) private usersService: UsersServiceInterface;

  @inject(TYPES.VolunteersService) private volunteersService: VolunteersServiceInterface;

  @inject(TYPES.SeekersService) private seekersService: SeekersServiceInterface;

  private readonly socket: SocketIOClient.Socket;

  constructor() {
    super();
    this.socket = io.connect(envConfig.API_URL);
  }

  @httpGet('/seekers')
  private async getAllSeekers(): Promise<JsonResult> {
    const allSeekers = await this.seekersService
      .getAllSeekers();

    this.socket.emit(SocketEvents.locations);

    return this.json(allSeekers);
  }

  @httpGet('/locations')
  private async getSeekersLocation(): Promise<JsonResult> {
    const seekersLocation = await this.seekersService
      .getAllSeekersLocations();

    return this.json(seekersLocation);
  }

  @httpPatch('/seeker/:id')
  private async updateSeeker(
    @requestParam('id') id: number,
    @requestBody() seekerInfo: Seeker,
  ): Promise<JsonResult> {
    const updatedSeeker = await this.seekersService
      .updateSeeker(id, seekerInfo);

    this.socket.emit(SocketEvents.locations);

    return this.json(updatedSeeker);
  }

  @httpDelete('/seeker/:id')
  private async deleteSeeker(
    @requestParam('id') id: number,
  ): Promise<JsonResult> {
    const deletedSeeker = await this.seekersService
      .deleteSeeker(id);

    this.socket.emit(SocketEvents.locations);

    return this.json(deletedSeeker);
  }
}
