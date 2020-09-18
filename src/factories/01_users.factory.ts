import { define } from 'typeorm-seeding';
import { Users } from '../entity';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
define(Users, (faker): Users => {
  const user: Users = new Users();

  user.name = faker.name.firstName(1);
  user.email = faker.internet.email();
  user.password = faker.random.words(10);
  user.phone = faker.phone.phoneNumber('+38-063-###-##-##');
  user.isBusiness = faker.random.boolean();
  user.status = faker.random.arrayElement(['Seeker', 'Volunteer', null]);

  return user;
});
