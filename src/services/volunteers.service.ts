import { inject, injectable } from 'inversify';
import {
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
    return this.repository.find();
  }

  async createVolunteer(volunteerData: Volunteer): Promise<Volunteer> {
    return this.repository.save(volunteerData);
  }

  async updateVolunteerLocation(
    id:number,
    x_location:number,
    y_location:number,
  ): Promise<UpdateResult> {
    return this.repository
      .update(
        id,
        {
          x_location,
          y_location,
        },
      );
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
          select: ['x_location', 'y_location'],
        },
      );
  }

  async getVolunteerLocation(volunteerId: number): Promise<Volunteers | undefined> {
    return this.repository
      .findOne(
        volunteerId,
        { select: ['x_location', 'x_location'] },
      );
  }
}
