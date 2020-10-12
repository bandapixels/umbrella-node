import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
} from 'inversify-express-utils';
import { Request, Response } from 'express';

import { TYPES } from '../services/types';
import { envConfig } from '../config';

import {
  SeekersServiceInterface,
  UsersServiceInterface,
  VolunteersServiceInterface,
} from '../interfaces';

@controller('')
export class HomeController extends BaseHttpController {
  @inject(TYPES.UsersService) private usersService: UsersServiceInterface;

  @inject(TYPES.VolunteersService) private volunteersService: VolunteersServiceInterface;

  @inject(TYPES.SeekersService) private seekersService: SeekersServiceInterface;

  @httpGet('/')
  private async getHome(req: Request, res: Response): Promise<void> {
    return res.render('index', { API_URL: envConfig.API_URL });
  }
}
