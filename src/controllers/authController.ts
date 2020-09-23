import jwt from 'jsonwebtoken';
import { inject } from 'inversify';
import {
  httpPost,
  BaseHttpController,
  controller,
  requestBody,
  httpGet,
  request, requestHeaders,
} from 'inversify-express-utils';

import {
  JsonResult,
  BadRequestResult,
  NotFoundResult,
  CreatedNegotiatedContentResult, BadRequestErrorMessageResult,
} from 'inversify-express-utils/dts/results';
import { Request } from 'express';
import { TYPES } from '../services/types';
import { NewUser } from '../models';

import {
  SeekersServiceInterface,
  UsersServiceInterface,
  VolunteersServiceInterface,
} from '../interfaces';
import { Users } from '../entity';
import { UserLoginRequestInterface } from '../contracts/requests/userLoginRequestInterface';

@controller('/auth')
export class AuthController extends BaseHttpController {
  @inject(TYPES.UsersService) private usersService: UsersServiceInterface;

  @inject(TYPES.VolunteersService) private volunteersService: VolunteersServiceInterface;

  @inject(TYPES.SeekersService) private seekersService: SeekersServiceInterface;

  @httpGet('/')
  private async getHome(): Promise<JsonResult> {
    return this.json({ msg: 'Hello, Auth Controller' });
  }

  @httpPost('/register')
  private async registerNewUser(
    @requestBody() userData: NewUser,
    @request() req: Request,
  ): Promise<CreatedNegotiatedContentResult<Users> | BadRequestResult > {
    const newUser = await this.usersService.registerUser(userData);

    return this.created<Users>(req.url, newUser);
  }

  @httpPost('/login')
  private async loginUser(
    @requestBody() userInfo: UserLoginRequestInterface,
  ): Promise<JsonResult | NotFoundResult> {
    const authenticatedUser = await this.usersService.authenticateUser(userInfo.email, userInfo.password);

    const accessToken = await this.usersService.generateAccessToken(
      {
        type: 'ACCESS',
        user_id: authenticatedUser.id,
      },
    );

    const refreshToken = await this.usersService.generateAccessToken(
      {
        type: 'REFRESH',
        user_id: authenticatedUser.id,
      },
    );

    return this.json({ accessToken, refreshToken });
  }

  @httpGet('/refresh')
  private async refreshToken(
    @requestHeaders('Authorization') BearerToken: string,
  ): Promise<JsonResult | BadRequestErrorMessageResult> {
    const payload = jwt.decode(BearerToken.split(' ')[1]);

    if (payload === null || typeof payload === 'string' || !payload.type) {
      return this.badRequest('Bad auth token');
    }

    if (payload.type !== 'REFRESH') {
      return this.badRequest('Wrong token type');
    }

    const accessToken = await this.usersService.generateAccessToken(
      {
        type: 'ACCESS',
        user_id: payload.id,
      },
    );

    const refreshToken = await this.usersService.generateAccessToken(
      {
        type: 'REFRESH',
        user_id: payload.id,
      },
    );

    return this.json({ accessToken, refreshToken });
  }
}
