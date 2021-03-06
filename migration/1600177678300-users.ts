import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1600176163529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
          length: '100',
          isNullable: false,
        },
        {
          name: 'email',
          type: 'varchar',
          length: '100',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          length: '100',
          isNullable: false,
        },
        {
          name: 'phone',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'status',
          type: 'enum',
          isNullable: true,
          enum: [
            'Seeker',
            'Volunteer',
          ],
          default: null,
        },
        {
          name: 'isBusiness',
          type: 'boolean',
          isNullable: true,
          default: false,
        },
        {
          name: 'strikes',
          type: 'integer',
          default: 0,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP(6)',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
