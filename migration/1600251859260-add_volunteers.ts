import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addVolunteers1600251859260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'volunteers',
      columns: [
        {
          name: 'user_id',
          type: 'serial',
          isPrimary: true,
        },
        {
          name: 'user_id',
          type: 'serial',
          isPrimary: true,
        },
        {
          name: 'x_location',
          type: 'numeric',
        },
        {
          name: 'y_location',
          type: 'numeric',
        },
        {
          name: 'type',
          type: 'enum',
          enum: ['Escort', 'Lend'],
          default: 'Lend',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('volunteers', true);
  }
}
