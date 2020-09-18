import { inject, injectable } from 'inversify';
import { Connection, createConnection, UpdateResult } from 'typeorm';
import { UsersServiceInterface, VolunteersServiceInterface } from '../interfaces';
import { NewUser, User, Volunteer } from '../models';
import { Users, UserStatus } from '../entity';
import { TYPES } from './types';

@injectable()
export class UsersService implements UsersServiceInterface {
  @inject(TYPES.VolunteersService) private volunteerService: VolunteersServiceInterface;

  private connection: Promise<Connection>;

  constructor() {
    this.connection = createConnection();
  }

  async getAllUsers(): Promise<Users[]> {
    return this.connection
      .then((connection: Connection) => connection
        .manager
        .find(Users));
  }

  async registerUser(userData: NewUser): Promise<NewUser> {
    return this.connection
      .then((connection: Connection) => connection
        .manager
        .save(userData));
  }

  async getUserById(id: number): Promise<Users> {
    return this.connection
      .then((connection: Connection) => connection
        .manager
        .findOneOrFail(Users, id));
  }

  // TODO  complete setUserStatus method

  // async setUserStatus(id: number, status: UserStatus): Promise<UpdateResult> {
  //   return this.connection
  //     .then(async (connection: Connection) => {
  //       const userById = await this.getUserById(id);
  //
  //       switch (status) {
  //       case 'Volunteer':
  //         await this.volunteerService.createVolunteer(userInfo);
  //         break;
  //
  //       case 'Seeker':
  //         break;
  //
  //       default:
  //         break;
  //       }
  //       return connection.manager
  //         .update(Users, user_id, { status });
  //     });
  // }

  async reportUser(userId: number): Promise<UpdateResult> {
    return this.connection
      .then((connection: Connection) => connection
        .manager
        .increment(
          Users,
          { id: userId },
          'strikes',
          1,
        ));
  }
}
