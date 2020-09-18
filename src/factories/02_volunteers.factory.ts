import { define } from 'typeorm-seeding';
import { Volunteers } from '../entity';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
define(Volunteers, (faker) => {
  const volunteer: Volunteers = new Volunteers();

  volunteer.user_id = 1;
  volunteer.type = faker.random.arrayElement(['Escort', 'Lend']);
  volunteer.x_location = faker.random.number({ max: 100, precision: 10 });
  volunteer.y_location = faker.random.number({ max: 100, precision: 10 });

  return volunteer;
});
