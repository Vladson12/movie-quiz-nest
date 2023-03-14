import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenMigration1678816426249
  implements MigrationInterface
{
  name = 'AddRefreshTokenMigration1678816426249';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
