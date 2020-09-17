import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './services/types';
import {
  UsersServiceInterface,
  VolunteerServiceInterface,
  TypeormConnectionServiceInterface,
} from './interfaces';
import {
  UsersService,
  VolunteerService,
  TypeormConnectionService,
} from './services';

const container = new Container();

container.bind<TypeormConnectionServiceInterface>(TYPES.TypeormConnectionService).to(TypeormConnectionService).inSingletonScope();
container.bind<UsersServiceInterface>(TYPES.UsersService).to(UsersService);
container.bind<VolunteerServiceInterface>(TYPES.VolunteerService).to(VolunteerService);

export { container };
