import { UpdateResult } from 'typeorm';
import { Volunteer } from '../models';
import { Volunteers } from '../entity';

export interface VolunteerServiceInterface {
  getAllVolunteers(): Promise<Volunteers[]>;
  createVolunteer(newVolunteer: Volunteer): Promise<Volunteers>;
  updateVolunteerLocation(x: number, y: number, id: number): Promise<UpdateResult>;
}
