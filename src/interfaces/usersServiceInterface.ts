import { DeleteResult, UpdateResult } from 'typeorm';
import { NewUser } from '../models';
import { Users } from '../entity';
import { Payload } from '../contracts/requests/tokenInterface';

export interface UsersServiceInterface {
  getAllUsers(): Promise<Users[]>;
  registerUser(newUser: NewUser): Promise<Users>;
  setUserStatusVolunteer(userId: number): Promise<UpdateResult>;
  setUserStatusSeeker(userId: number): Promise<UpdateResult>;
  getUserById(id: number): Promise<Users>;
  reportUser(userId: number): Promise<UpdateResult>;
  likeUser(userId: number): Promise<UpdateResult>;
  deleteUser(userId: number): Promise<DeleteResult>;
  authenticateUser(userEmail: string, userPassword: string): Promise<Users>;
  generateAccessToken(accessPayload: Payload): Promise<string>;
  generateRefreshToken(refreshPayload: Payload): Promise<string>;
}
