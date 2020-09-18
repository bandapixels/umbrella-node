import { inject, injectable } from 'inversify';
import {
  Connection, getConnection, Repository, UpdateResult,
} from 'typeorm';
import { TYPES } from './types';
import { Volunteers } from '../entity';
import { VolunteersServiceInterface } from '../interfaces';
import { Volunteer } from '../models';

@injectable()
export class VolunteersService implements VolunteersServiceInterface {
  private volunteersRepository: Connection;

  constructor() {
    this.volunteersRepository = getConnection('volunteers');
  }

  async getAllVolunteers(): Promise<Volunteers[]> {
    return this.volunteersRepository
      .manager
      .find(Volunteers);
  }

  async createVolunteer(volunteerData: Volunteer): Promise<Volunteer> {
    return this.volunteersRepository
      .manager
      .save(volunteerData);
  }

  async updateVolunteerLocation(
    id:number,
    x_location:number,
    y_location:number,
  ): Promise<UpdateResult> {
    return this.volunteersRepository
      .manager
      .update(
        Volunteers,
        id,
        {
          x_location,
          y_location,
        },
      );
  }

  async updateVolunteer(volunteerId: number, data: Partial<Volunteers>): Promise<UpdateResult> {
    return this.volunteersRepository
      .manager
      .update(Volunteers, volunteerId, data);
  }

  async getVolunteersLocation(): Promise<Volunteers[]> {
    return this.volunteersRepository
      .createQueryBuilder()
      .select(['x_location', 'y_location'])
      .getMany();
  }
}
