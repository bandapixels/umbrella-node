import { define } from 'typeorm-seeding';
import faker from 'faker';

import { Users } from '../entity';

define(Users, (): Users => {
  const user: Users = new Users();

  user.name = faker.name.firstName(1);
  user.email = faker.internet.email();
  user.password = faker.random.words(10);
  user.phone = faker.phone.phoneNumber('+38-063-###-##-##');
  user.isBusiness = faker.random.boolean();
  user.status = faker.random.arrayElement(['Seeker', 'Volunteer', null]);

  return user;
});
