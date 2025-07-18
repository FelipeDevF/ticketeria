import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersTable1752849921585 implements MigrationInterface {
    name = 'CreateOrdersTable1752849921585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TYPE "order_status_enum" AS ENUM ('pending', 'paid', 'cancelled');
          CREATE TABLE "order" (
              "id" SERIAL PRIMARY KEY,
              "userId" INTEGER NOT NULL,
              "ticketId" INTEGER NOT NULL,
              "status" "order_status_enum" NOT NULL DEFAULT 'pending',
              CONSTRAINT "FK_order_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
              CONSTRAINT "FK_order_ticket" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE
          );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE IF EXISTS "order"; DROP TYPE IF EXISTS "order_status_enum";`);
    }

}
