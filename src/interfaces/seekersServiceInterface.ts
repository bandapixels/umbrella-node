import { UpdateResult } from 'typeorm';
import { Seeker } from '../models';
import { Seekers } from '../entity';

export interface SeekersServiceInterface {
  getAllSeekers(): Promise<Seekers[]>;
  createSeeker(newSeeker: Seeker): Promise<Seeker>;
  updateSeeker(seekerId: number, data: Partial<Seekers>): Promise<UpdateResult>;
}
