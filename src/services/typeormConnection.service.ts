import { injectable } from 'inversify';
import { Connection, getConnection } from 'typeorm';
import { TypeormConnectionServiceInterface } from '../interfaces';

@injectable()
export class TypeormConnectionService implements TypeormConnectionServiceInterface {
  private readonly connection: Connection;

  constructor() {
    this.connection = getConnection();
  }

  getConnection(): Connection {
    return this.connection;
  }
}
