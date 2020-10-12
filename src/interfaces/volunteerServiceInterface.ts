import { DeleteResult, UpdateResult } from 'typeorm';
import { Volunteer } from '../models';
import { Volunteers } from '../entity';

export interface VolunteersServiceInterface {
  getAllVolunteers(): Promise<Volunteers[]>;
  createVolunteer(newVolunteer: Volunteer): Promise<Volunteers>;
  updateVolunteer(volunteerId: number, data: Partial<Volunteers>): Promise<UpdateResult>;
  getAllVolunteersLocation(): Promise<Volunteers[]>;
  getVolunteerLocation(volunteerId: number): Promise<Volunteers | undefined>;
  deleteVolunteer(volunteerId: number): Promise<DeleteResult>;
}
