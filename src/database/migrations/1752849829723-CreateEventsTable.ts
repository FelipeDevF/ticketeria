import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEventsTable1752849829723 implements MigrationInterface {
    name = 'CreateEventsTable1752849829723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "event" (
              "id" SERIAL PRIMARY KEY,
              "name" VARCHAR(255) NOT NULL,
              "description" TEXT NOT NULL,
              "date" TIMESTAMPTZ NOT NULL,
              "location" VARCHAR(255) NOT NULL,
              "active" BOOLEAN NOT NULL DEFAULT true
          );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE IF EXISTS "event";`);
    }

}
