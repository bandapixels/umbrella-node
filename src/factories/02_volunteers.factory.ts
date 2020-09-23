import { define } from 'typeorm-seeding';
import faker from 'faker';

import { Volunteers } from '../entity';

define(Volunteers, () => {
  const volunteer: Volunteers = new Volunteers();

  volunteer.user_id = faker.random.number({ min: 1, max: 5 });
  volunteer.type = faker.random.arrayElement(['Escort', 'Lend']);
  volunteer.x_location = +faker.address.latitude();
  volunteer.y_location = +faker.address.longitude();

  return volunteer;
});
