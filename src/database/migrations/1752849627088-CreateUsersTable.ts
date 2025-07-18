import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1752849627088 implements MigrationInterface {
    name = 'CreateUsersTable1752849627088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "user" (
              "id" SERIAL PRIMARY KEY,
              "email" VARCHAR(255) UNIQUE NOT NULL,
              "password" VARCHAR(255) NOT NULL,
              "name" VARCHAR(255) NOT NULL,
              "role" VARCHAR(50) NOT NULL DEFAULT 'user'
          );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
    }

}
