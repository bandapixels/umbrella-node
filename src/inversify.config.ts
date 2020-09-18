import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './services/types';
import { UsersServiceInterface, VolunteersServiceInterface } from './interfaces';
import { UsersService, VolunteersService } from './services';

const container = new Container();

container.bind<UsersServiceInterface>(TYPES.UsersService).to(UsersService);
container.bind<VolunteersServiceInterface>(TYPES.VolunteersService).to(VolunteersService);

export { container };
