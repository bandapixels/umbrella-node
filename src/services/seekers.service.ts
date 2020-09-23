import { inject, injectable } from 'inversify';
import {
  DeleteResult, getConnection, Repository, UpdateResult,
} from 'typeorm';

import { TYPES } from './types';
import { Seekers } from '../entity';
import { Seeker } from '../models';
import { SeekersServiceInterface, UsersServiceInterface } from '../interfaces';

@injectable()
export class SeekersService implements SeekersServiceInterface {
  @inject(TYPES.UsersService) private usersService: UsersServiceInterface;

  private repository: Repository<Seekers>;

  constructor() {
    this.repository = getConnection().getRepository<Seekers>('seekers');
  }

  async getAllSeekers(): Promise<Seekers[]> {
    return this.repository
      .find();
  }

  async createSeeker(seekerData: Seeker): Promise<Seeker> {
    return this.repository
      .save(seekerData);
  }

  async updateSeeker(seekerId: number, data: Partial<Seekers>): Promise<UpdateResult> {
    return this.repository
      .update(seekerId, data);
  }

  async deleteSeeker(seekerId: number): Promise<DeleteResult> {
    return this.repository
      .delete(seekerId);
  }
}
