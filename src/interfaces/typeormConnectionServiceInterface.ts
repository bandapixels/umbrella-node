import { Connection } from 'typeorm';

export interface TypeormConnectionServiceInterface {
  getConnection(): Connection;
}
