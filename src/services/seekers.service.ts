import { inject, injectable } from 'inversify';
import {
  Connection,
  getConnection,
  UpdateResult,
} from 'typeorm';
import { TYPES } from './types';
import { Seekers } from '../entity';
import { Seeker } from '../models';
import {
  SeekersServiceInterface,
  UsersServiceInterface,
  VolunteersServiceInterface,
} from '../interfaces';

@injectable()
export class SeekersService implements SeekersServiceInterface {
  @inject(TYPES.UsersService) private usersService: UsersServiceInterface;

  @inject(TYPES.VolunteersService) private volunteersService: VolunteersServiceInterface;

  private seekersRepository: Connection;

  constructor() {
    this.seekersRepository = getConnection('seekers');
  }

  async getAllSeekers(): Promise<Seekers[]> {
    return this.seekersRepository
      .manager
      .find(Seekers);
  }

  async createSeeker(newSeeker: Seeker): Promise<Seeker> {
    return this.seekersRepository
      .manager
      .save(Seekers, newSeeker);
  }

  async updateSeeker(seekerId: number, data: Partial<Seekers>): Promise<UpdateResult> {
    return this.seekersRepository
      .manager
      .update(Seekers, seekerId, data);
  }
}
