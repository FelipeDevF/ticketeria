import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTicketsTable1752849877485 implements MigrationInterface {
    name = 'CreateTicketsTable1752849877485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "ticket" (
              "id" SERIAL PRIMARY KEY,
              "type" VARCHAR(100) NOT NULL,
              "price" DECIMAL NOT NULL,
              "eventId" INTEGER NOT NULL,
              "userId" INTEGER,
              CONSTRAINT "FK_ticket_event" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE,
              CONSTRAINT "FK_ticket_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL
          );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE IF EXISTS "ticket";`);
    }

}
