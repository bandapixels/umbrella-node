import { define } from 'typeorm-seeding';
import { Seekers } from '../entity';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
define(Seekers, (faker): Seekers => {
  const seeker: Seekers = new Seekers();

  seeker.user_id = 2;
  seeker.x_location = faker.random.number(100);
  seeker.y_location = faker.random.number(100);

  return seeker;
});
