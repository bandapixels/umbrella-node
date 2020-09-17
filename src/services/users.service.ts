import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { TypeormConnectionService } from './typeormConnection.service';
import { TYPES } from './types';
import { UsersServiceInterface } from '../interfaces';
import { NewUser, User } from '../models';
import {
  Users,
  UserStatus,
  Volunteers,
} from '../entity';

@injectable()
export class UsersService implements UsersServiceInterface {
  private userRepository: Repository<Users>;

  constructor(@inject(TYPES.TypeormConnectionService) typeormConnection: TypeormConnectionService) {
    this.userRepository = typeormConnection
      .getConnection()
      .getRepository(Users);
  }

  async getAllUsers(): Promise<Users[]> {
    return this.userRepository
      .manager
      .find(Users);
  }

  // async setUserStatus(userId: number, status: UserStatus) {
  //   // ...
  // }

  async registerUser(userData: NewUser): Promise<NewUser> {
    return this.userRepository
      .manager
      .save(Users, userData);
  }
}
