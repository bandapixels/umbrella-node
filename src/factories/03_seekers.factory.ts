import { define } from 'typeorm-seeding';
import faker from 'faker';

import { Seekers } from '../entity';

define(Seekers, (): Seekers => {
  const seeker: Seekers = new Seekers();

  seeker.user_id = faker.random.number({ min: 6, max: 10 });
  seeker.x_location = +faker.address.latitude();
  seeker.y_location = +faker.address.longitude();

  return seeker;
});
