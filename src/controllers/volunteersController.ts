import io from 'socket.io-client';
import { inject } from 'inversify';
import { JsonResult, NotFoundResult } from 'inversify-express-utils/dts/results';
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
import { passportAuthMiddleware } from '../config/passport.config';
import { TYPES } from '../services/types';
import { Volunteer } from '../models';

import {
  SeekersServiceInterface,
  UsersServiceInterface,
  VolunteersServiceInterface,
} from '../interfaces';

@controller('/volunteers', passportAuthMiddleware)
export class VolunteersController extends BaseHttpController {
  @inject(TYPES.UsersService) private usersService: UsersServiceInterface;

  @inject(TYPES.VolunteersService) private volunteersService: VolunteersServiceInterface;

  @inject(TYPES.SeekersService) private seekersService: SeekersServiceInterface;

  private readonly socket: SocketIOClient.Socket;

  constructor() {
    super();
    this.socket = io.connect(envConfig.API_URL);
  }

  @httpGet('/location/:id')
  private async getVolunteerLocation(
    @requestParam('id') id: number,
  ): Promise<JsonResult | NotFoundResult> {
    const volunteerLocation = await this.volunteersService
      .getVolunteerLocation(id);

    if (!volunteerLocation) {
      return this.notFound();
    }

    return this.json(volunteerLocation);
  }

  @httpGet('/locations')
  private async getVolunteersLocation(): Promise<JsonResult> {
    const volunteersLocation = await this.volunteersService
      .getAllVolunteersLocation();

    this.socket.emit(SocketEvents.locations);

    return this.json(volunteersLocation);
  }

  @httpPatch('/volunteer/:id')
  private async updateVolunteer(
    @requestParam('id') id: number,
    @requestBody() volunteerInfo: Volunteer,
  ): Promise<JsonResult> {
    const updatedVolunteer = await this.volunteersService
      .updateVolunteer(id, volunteerInfo);

    return this.json(updatedVolunteer);
  }

  @httpDelete('/volunteer/:id')
  private async deleteVolunteer(
    @requestParam('id') id: number,
  ): Promise<JsonResult> {
    const deletedVolunteer = await this.volunteersService
      .deleteVolunteer(id);

    return this.json(deletedVolunteer);
  }
}
