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

import { Users } from '../entity';
import { TYPES } from '../services/types';
import { passportAuthMiddleware } from '../config/passport.config';
import { Seeker, Volunteer } from '../models';

import {
  SeekersServiceInterface,
  UsersServiceInterface,
  VolunteersServiceInterface,
} from '../interfaces';

@controller('/users', passportAuthMiddleware)
export class UsersController extends BaseHttpController {
  @inject(TYPES.UsersService) private usersService: UsersServiceInterface;

  @inject(TYPES.VolunteersService) private volunteersService: VolunteersServiceInterface;

  @inject(TYPES.SeekersService) private seekersService: SeekersServiceInterface;

  @httpGet('/users')
  private async getAllUsers(): Promise<JsonResult> {
    const allUsers: Users[] = await this.usersService
      .getAllUsers();

    return this.json(allUsers);
  }

  @httpGet('/user/:id')
  private async getUserById(
    @requestParam('id') id: number,
  ): Promise<JsonResult> {
    const userById = await this.usersService
      .getUserById(id);

    return this.json(userById);
  }

  @httpPatch('/report/:id')
  private async reportUser(
    @requestParam('id') id: number,
  ): Promise<JsonResult> {
    const reportedUser = await this.usersService
      .reportUser(id);

    return this.json(reportedUser);
  }

  @httpDelete('/user/:id')
  private async deleteUser(
    @requestParam('id') id: number,
  ): Promise<JsonResult> {
    const deletedUser = await this.usersService
      .deleteUser(id);

    return this.json(deletedUser);
  }

  @httpPatch('/volunteers')
  private async setStatusToVolunteer(
    @requestBody() volunteerInfo: Volunteer,
  ): Promise<JsonResult> {
    await this.usersService
      .setUserStatusVolunteer(volunteerInfo.user_id);

    const newVolunteer = await this.volunteersService
      .createVolunteer(volunteerInfo);

    return this.json(newVolunteer);
  }

  @httpPatch('/seekers')
  private async setStatusToSeeker(
    @requestBody() seekerInfo: Seeker,
  ): Promise<JsonResult> {
    await this.usersService
      .setUserStatusSeeker(seekerInfo.user_id);

    const newSeeker = await this.seekersService
      .createSeeker(seekerInfo);

    return this.json(newSeeker);
  }
}
