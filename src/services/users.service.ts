import { injectable } from 'inversify';
import {
  DeleteResult,
  getConnection,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Users } from '../entity';
import { UsersServiceInterface } from '../interfaces';
import { NewUser } from '../models';

@injectable()
export class UsersService implements UsersServiceInterface {
  private repository: Repository<Users>;

  constructor() {
    this.repository = getConnection().getRepository<Users>('users');
  }

  async getAllUsers(): Promise<Users[]> {
    return this.repository.find();
  }

  async registerUser(userData: NewUser): Promise<NewUser> {
    return this.repository.save(userData);
  }

  async getUserById(id: number): Promise<Users> {
    return this.repository.findOneOrFail(id);
  }

  async setUserStatusVolunteer(userId: number): Promise<UpdateResult> {
    return this.repository
      .update(userId, { status: 'Volunteer' });
  }

  async setUserStatusSeeker(userId: number): Promise<UpdateResult> {
    return this.repository
      .update(userId, { status: 'Seeker' });
  }

  async reportUser(userId: number): Promise<UpdateResult> {
    return this.repository
      .decrement(
        { id: userId },
        'strikes',
        1,
      );
  }

  async likeUser(userId: number): Promise<UpdateResult> {
    return this.repository
      .increment(
        { id: userId },
        'strikes',
        1,
      );
  }

  async deleteUser(userId: number): Promise<DeleteResult> {
    return this.repository
      .delete(userId);
  }
}
