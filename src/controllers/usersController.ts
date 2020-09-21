import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPatch,
  httpDelete,
  requestParam, BaseHttpController, requestBody, response, request,
} from 'inversify-express-utils';
import { Request, Response } from 'express';

import { resolve } from 'dns';
import { JsonResult } from 'inversify-express-utils/dts/results';
import { TYPES } from '../services/types';
import {
  SeekersServiceInterface,
  UsersServiceInterface,
  VolunteersServiceInterface,
} from '../interfaces';
import { Users } from '../entity';
import { Volunteer } from '../models';

@controller('/users')
export class UsersController extends BaseHttpController {
  @inject(TYPES.UsersService) private usersService: UsersServiceInterface;

  @inject(TYPES.VolunteersService) private volunteersService: VolunteersServiceInterface;

  @inject(TYPES.SeekersService) private seekersService: SeekersServiceInterface;

  @httpGet('/users')
  private async getAllUsers(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const allUsers: Users[] = await this.usersService.getAllUsers();

    return res.status(200).json(allUsers);
  }

  @httpGet('/user/:id')
  private async getUserById(
    @requestParam('id') id: number,
      req: Request,
      res: Response,
  ): Promise<Response> {
    const userById = await this.usersService.getUserById(id);

    return res.status(200).json(userById);
  }

  @httpPatch('/report/:id')
  private async reportUser(
    @requestParam('id') id: number,
      req: Request,
      res: Response,
  ): Promise<Response> {
    const reportedUser = await this.usersService.reportUser(id);

    return res.status(200).json(reportedUser);
  }

  @httpDelete('/user/:id')
  private async deleteUser(
    @requestParam('id') id: number,
      req: Request,
      res: Response,
  ): Promise<Response> {
    const deletedUser = await this.usersService.deleteUser(id);

    return res.status(200).json(deletedUser);
  }

  @httpPatch('/volunteer/:id')
  private async setStatusToVolunteer(
    @requestParam('id') id: number,
    @requestBody() volunteerInfo: Volunteer,
  ): Promise<JsonResult> {
    await this.usersService.setUserStatusVolunteer(id);
    const newVolunteer = await this.volunteersService.createVolunteer(volunteerInfo);

    return this.json(newVolunteer);
  }
}
