import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class addVolunteers1600251859260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'volunteers',
      columns: [
        {
          name: 'user_id',
          type: 'integer',
          isNullable: false,
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
          default: '\'Lend\'',
        },
      ],
    }), true);

    await queryRunner.createForeignKey('volunteers', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('volunteers', true);
  }
}
