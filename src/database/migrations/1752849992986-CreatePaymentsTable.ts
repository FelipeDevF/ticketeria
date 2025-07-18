import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentsTable1752849992986 implements MigrationInterface {
    name = 'CreatePaymentsTable1752849992986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "payment" (
              "id" SERIAL PRIMARY KEY,
              "status" VARCHAR(50) NOT NULL,
              "orderId" INTEGER UNIQUE,
              CONSTRAINT "FK_payment_order" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE
          );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE IF EXISTS "payment";`);
    }

}
