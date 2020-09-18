import { UpdateResult } from 'typeorm';
import { NewUser } from '../models';
import { Users, UserStatus } from '../entity';

export interface UsersServiceInterface {
  getAllUsers(): Promise<Users[]>;
  registerUser(newUser: NewUser): Promise<NewUser>;
  // setUserStatus(userId: number, status: UserStatus): Promise<UpdateResult>;
  getUserById(id: number): Promise<Users>;
  reportUser(userId: number): Promise<UpdateResult>;
}
