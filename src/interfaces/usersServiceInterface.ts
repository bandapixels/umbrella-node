import { NewUser } from '../models';
import { Users } from '../entity';

export interface UsersServiceInterface {
  getAllUsers(): Promise<Users[]>;
  registerUser(newUser: NewUser): Promise<NewUser>;
}
