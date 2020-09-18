import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Users } from '../src/entity/Users';

export default class CreateUsers implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Users)().createMany(100);
  }
}
