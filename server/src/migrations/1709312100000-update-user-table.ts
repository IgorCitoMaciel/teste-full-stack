import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1709312100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE user 
            MODIFY COLUMN name VARCHAR(255) NOT NULL,
            MODIFY COLUMN email VARCHAR(255) NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE user 
            MODIFY COLUMN name VARCHAR(255),
            MODIFY COLUMN email VARCHAR(255);
        `);
  }
}
