import { DeleteResult, UpdateResult } from 'typeorm';
import { NewUser, Seeker, Volunteer } from '../models';
import { Users } from '../entity';

export interface UsersServiceInterface {
  getAllUsers(): Promise<Users[]>;
  registerUser(newUser: NewUser): Promise<NewUser>;
  setUserStatusVolunteer(userId: number): Promise<UpdateResult>;
  setUserStatusSeeker(userId: number): Promise<UpdateResult>;
  getUserById(id: number): Promise<Users>;
  reportUser(userId: number): Promise<UpdateResult>;
  likeUser(userId: number): Promise<UpdateResult>;
  deleteUser(userId: number): Promise<DeleteResult>;
}
