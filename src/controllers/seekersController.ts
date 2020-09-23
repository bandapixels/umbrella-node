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

import { TYPES } from '../services/types';
import { Seeker } from '../models';
import { passportAuthMiddleware } from '../config/passport.config';

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

  @httpGet('/seekers')
  private async getAllSeekers(): Promise<JsonResult> {
    const allSeekers = await this.seekersService
      .getAllSeekers();

    return this.json(allSeekers);
  }

  @httpPatch('/seeker/:id')
  private async updateSeeker(
    @requestParam('id') id: number,
    @requestBody() seekerInfo: Seeker,
  ): Promise<JsonResult> {
    const updatedSeeker = await this.seekersService
      .updateSeeker(id, seekerInfo);

    return this.json(updatedSeeker);
  }

  @httpDelete('/seeker/:id')
  private async deleteSeeker(
    @requestParam('id') id: number,
  ): Promise<JsonResult> {
    const deletedSeeker = await this.seekersService
      .deleteSeeker(id);

    return this.json(deletedSeeker);
  }
}
