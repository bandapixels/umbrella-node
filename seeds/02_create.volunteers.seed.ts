import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Volunteers } from '../src/entity/Volunteers';

export default class CreateVolunteers implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Volunteers)().create();
  }
}
