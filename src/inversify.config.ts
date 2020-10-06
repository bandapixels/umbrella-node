import { Container } from 'inversify';

import { TYPES } from './services/types';
import {
  SeekersService,
  UsersService,
  VolunteersService,
} from './services';
import {
  SeekersServiceInterface,
  UsersServiceInterface,
  VolunteersServiceInterface,
} from './interfaces';

const container = new Container();

container.bind<UsersServiceInterface>(TYPES.UsersService).to(UsersService);
container.bind<VolunteersServiceInterface>(TYPES.VolunteersService).to(VolunteersService);
container.bind<SeekersServiceInterface>(TYPES.SeekersService).to(SeekersService);

export default container;
