import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleMigration1679433629155 implements MigrationInterface {
  name = 'RoleMigration1679433629155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }
}
