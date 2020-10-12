import { inject, injectable } from 'inversify';
import {
  DeleteResult,
  getConnection,
  Repository,
  UpdateResult,
} from 'typeorm';

import { TYPES } from './types';
import { Volunteers } from '../entity';
import { Volunteer } from '../models';
import { UsersServiceInterface, VolunteersServiceInterface } from '../interfaces';

@injectable()
export class VolunteersService implements VolunteersServiceInterface {
  @inject(TYPES.UsersService) private usersService: UsersServiceInterface;

  private repository: Repository<Volunteers>;

  constructor() {
    this.repository = getConnection().getRepository<Volunteers>('volunteers');
  }

  async getAllVolunteers(): Promise<Volunteers[]> {
    return this.repository
      .find();
  }

  async createVolunteer(volunteerData: Volunteer): Promise<Volunteer> {
    return this.repository
      .save(volunteerData);
  }

  async updateVolunteer(
    volunteerId: number,
    data: Partial<Volunteers>,
  ): Promise<UpdateResult> {
    return this.repository
      .update(volunteerId, data);
  }

  async getAllVolunteersLocation(): Promise<Volunteers[]> {
    return this.repository
      .find(
        {
          select: [
            'user_id',
            'x_location',
            'y_location',
            'type',
          ],
        },
      );
  }

  async getVolunteerLocation(volunteerId: number): Promise<Volunteers | undefined> {
    return this.repository
      .findOne(
        volunteerId,
        {
          select: ['user_id', 'x_location', 'y_location'],
        },
      );
  }

  async deleteVolunteer(volunteerId: number): Promise<DeleteResult> {
    return this.repository
      .delete(volunteerId);
  }
}
