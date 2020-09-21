import { inject } from 'inversify';
import {
  controller,
  httpPost,
  requestBody, BaseHttpController,
} from 'inversify-express-utils';
import { Request, Response } from 'express';

import { NotFoundResult } from 'inversify-express-utils/dts/results';
import { TYPES } from '../services/types';
import { NewUser, User } from '../models';
import { Volunteers } from '../entity';
import {
  SeekersServiceInterface,
  UsersServiceInterface,
  VolunteersServiceInterface,
} from '../interfaces';

@controller('/auth')
export class AuthController extends BaseHttpController {
  @inject(TYPES.UsersService) private usersService: UsersServiceInterface;

  @inject(TYPES.VolunteersService) private volunteersService: VolunteersServiceInterface;

  @inject(TYPES.SeekersService) private seekersService: SeekersServiceInterface;

  @httpPost('/register')
  private async registerNewUser(
    @requestBody() userData: NewUser,
      req: Request,
      res: Response,
  ): Promise<NewUser> {
    return this.usersService.registerUser(userData);
  }

  // TODO add login method to services
  @httpPost('/login')
  private async loginUser(
    @requestBody() userData: Partial<User>,
      req: Request,
      res: Response,
  ): Promise<Volunteers | NotFoundResult > {
    const volunteerLocation = await this.volunteersService.getVolunteerLocation(1);

    if (!volunteerLocation) {
      return this.notFound();
    }

    return volunteerLocation;
  }
}
