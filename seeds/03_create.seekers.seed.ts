import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Seekers } from '../src/entity';

export default class CreateUsers implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Seekers)().create();
  }
}
