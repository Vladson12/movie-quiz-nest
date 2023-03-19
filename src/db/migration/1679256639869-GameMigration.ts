import { MigrationInterface, QueryRunner } from 'typeorm';

export class GameMigration1679256639869 implements MigrationInterface {
  name = 'GameMigration1679256639869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "playedAt" TIMESTAMP NOT NULL DEFAULT now(), "size" integer NOT NULL, "correctAnswers" integer NOT NULL, "playerId" uuid, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "game" ADD CONSTRAINT "FK_d5ca205249b208d25dcc5f6355e" FOREIGN KEY ("playerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game" DROP CONSTRAINT "FK_d5ca205249b208d25dcc5f6355e"`,
    );
    await queryRunner.query(`DROP TABLE "game"`);
  }
}
