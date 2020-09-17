import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class addSeekers1600252237545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'seekers',
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
      ],
    }), true);

    await queryRunner.createForeignKey('seekers', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('seekers', true);
  }
}
