import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovieMigration1678392512166 implements MigrationInterface {
  name = 'MovieMigration1678392512166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" SERIAL NOT NULL, "theMovieDbId" integer NOT NULL, "originalTitle" character varying NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movie"`);
  }
}
