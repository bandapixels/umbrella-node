import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import {
  DeleteResult,
  getConnection,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Users } from '../entity';
import { UsersServiceInterface } from '../interfaces';
import { NewUser } from '../models';
import { PayloadInterface } from '../contracts/requests/payloadInterface';
import { envConfig } from '../config';

@injectable()
export class UsersService implements UsersServiceInterface {
  private repository: Repository<Users>;

  constructor() {
    this.repository = getConnection().getRepository<Users>('users');
  }

  async getAllUsers(): Promise<Users[]> {
    return this.repository
      .find();
  }

  async registerUser(userData: NewUser): Promise<Users> {
    const hashedPassword = await bcrypt.hash(userData.password, 1);

    return this.repository
      .save(
        {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          phone: userData.phone,
          status: userData.status,
          isBusiness: userData.isBusiness,
        },
      );
  }

  async getUserById(id: number): Promise<Users> {
    return this.repository
      .findOneOrFail(id);
  }

  async setUserStatusVolunteer(userId: number): Promise<UpdateResult> {
    return this.repository
      .update(userId, { status: 'Volunteer' });
  }

  async setUserStatusSeeker(userId: number): Promise<UpdateResult> {
    return this.repository
      .update(
        userId,
        { status: 'Seeker' },
      );
  }

  async reportUser(userId: number): Promise<UpdateResult> {
    return this.repository
      .decrement(
        { id: userId },
        'strikes',
        1,
      );
  }

  async likeUser(userId: number): Promise<UpdateResult> {
    return this.repository
      .increment(
        { id: userId },
        'strikes',
        1,
      );
  }

  async deleteUser(userId: number): Promise<DeleteResult> {
    return this.repository
      .delete(userId);
  }

  async authenticateUser(userEmail:string, userPassword:string): Promise<Users> {
    const userFound = await this.repository.findOneOrFail({
      where: {
        email: userEmail,
      },
    });

    const passwordIsGood = await bcrypt.compare(userPassword, userFound.password);

    if (!passwordIsGood) {
      throw new Error('Bad Password');
    }

    return userFound;
  }

  async generateAccessToken(accessPayload: PayloadInterface): Promise<string> {
    return jwt.sign(
      accessPayload,
      envConfig.JWT_SECRET_KEY,
      { expiresIn: '1d' },
    );
  }

  async generateRefreshToken(refreshPayload: PayloadInterface): Promise<string> {
    return jwt.sign(
      refreshPayload,
      envConfig.JWT_SECRET_KEY,
      { expiresIn: '10d' },
    );
  }
}
