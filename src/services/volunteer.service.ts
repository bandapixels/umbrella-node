import { inject, injectable } from 'inversify';
import { Repository, UpdateResult } from 'typeorm';
import { TypeormConnectionService } from './typeormConnection.service';
import { TYPES } from './types';
import { Volunteers } from '../entity';
import { VolunteerServiceInterface } from '../interfaces';
import { Volunteer } from '../models';

@injectable()
export class VolunteerService implements VolunteerServiceInterface {
  private volunteersRepository: Repository<Volunteers>;

  constructor(@inject(TYPES.TypeormConnectionService) typeormConnection: TypeormConnectionService) {
    this.volunteersRepository = typeormConnection
      .getConnection()
      .getRepository(Volunteers);
  }

  async getAllVolunteers(): Promise<Volunteers[]> {
    return this.volunteersRepository.find();
  }

  async createVolunteer(volunteerData: Volunteer): Promise<Volunteer> {
    return this.volunteersRepository.save(volunteerData);
  }

  async updateVolunteerLocation(
    id:number,
    x_location:number,
    y_location:number,
  ): Promise<UpdateResult> {
    return this.volunteersRepository.update(id, {
      x_location,
      y_location,
    });
  }

  async updateVolunteer(volunteerId: number, data: Partial<Volunteers>): Promise<UpdateResult> {
    return this.volunteersRepository.update(volunteerId, data);
  }
}
