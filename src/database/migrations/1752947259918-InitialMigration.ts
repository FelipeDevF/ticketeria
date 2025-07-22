import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1752947259918 implements MigrationInterface {
    name = 'InitialMigration1752947259918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tickets_type_enum" AS ENUM('vip', 'premium', 'standard', 'student', 'senior')`);
        await queryRunner.query(`CREATE TYPE "public"."tickets_status_enum" AS ENUM('available', 'reserved', 'sold', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text NOT NULL, "type" "public"."tickets_type_enum" NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "sold_quantity" integer NOT NULL DEFAULT '0', "reserved_quantity" integer NOT NULL DEFAULT '0', "status" "public"."tickets_status_enum" NOT NULL DEFAULT 'available', "sale_start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "sale_end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "max_per_purchase" integer NOT NULL DEFAULT '10', "has_seat_number" boolean NOT NULL DEFAULT false, "additional_info" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "event_id" uuid NOT NULL, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_efa6c4f84fb295c3dac56e43a6" ON "tickets" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_12b901b34113688b4786368510" ON "tickets" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_d3bd77e06fb9312d22944b1630" ON "tickets" ("event_id", "type") `);
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded')`);
        await queryRunner.query(`CREATE TYPE "public"."payments_payment_method_enum" AS ENUM('credit_card', 'debit_card', 'pix', 'bank_slip', 'digital_wallet')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'pending', "payment_method" "public"."payments_payment_method_enum" NOT NULL, "gateway_transaction_id" character varying(255), "gateway_payment_id" character varying(255), "payment_url" character varying(500), "pix_code" text, "barcode" character varying(100), "due_date" TIMESTAMP WITH TIME ZONE, "processed_at" TIMESTAMP WITH TIME ZONE, "error_message" text, "additional_data" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "order_id" uuid NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1237daf748b7653a6ebb9492fe" ON "payments" ("created_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f65f62084af2ebfbe39f8955b" ON "payments" ("payment_method") `);
        await queryRunner.query(`CREATE INDEX "IDX_32b41cdb985a296213e9a928b5" ON "payments" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_b2f7b823a21562eeca20e72b00" ON "payments" ("order_id") `);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'refunded')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_number" character varying(50) NOT NULL, "quantity" integer NOT NULL, "unit_price" integer NOT NULL, "total_price" integer NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending', "attendee_names" jsonb, "attendee_emails" jsonb, "seat_numbers" jsonb, "notes" text, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "ticket_id" uuid NOT NULL, CONSTRAINT "UQ_75eba1c6b1a66b09f2a97e6927b" UNIQUE ("order_number"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c884e321f927d5b86aac7c8f9e" ON "orders" ("created_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_775c9f06fc27ae3ff8fb26f2c4" ON "orders" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_a922b820eeef29ac1c6800e826" ON "orders" ("user_id") `);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'organizer', 'customer')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "cpf" character varying(14), "phone" character varying(20), "birth_date" date, "address" text, "city" character varying(100), "state" character varying(2), "zip_code" character varying(9), "role" "public"."users_role_enum" NOT NULL DEFAULT 'customer', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_230b925048540454c8b4c481e1" ON "users" ("cpf") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."events_category_enum" AS ENUM('music', 'theater', 'sports', 'conference', 'workshop', 'exhibition', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('draft', 'published', 'cancelled', 'completed')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "category" "public"."events_category_enum" NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "venue" character varying(255) NOT NULL, "address" text NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(2) NOT NULL, "zip_code" character varying(9) NOT NULL, "image_url" character varying(500), "capacity" integer NOT NULL, "status" "public"."events_status_enum" NOT NULL DEFAULT 'draft', "is_featured" boolean NOT NULL DEFAULT false, "tags" character varying(500), "additional_info" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "organizer_id" uuid NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_03dcebc1ab44daa177ae9479c4" ON "events" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_f20503eb78cfdac5f8eda342c8" ON "events" ("category") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce5225c17497c5adddc1819c69" ON "events" ("start_date") `);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_bd5387c23fb40ae7e3526ad75ea" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_78597268621a8df3476d38313c2" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_14c9ce53a2c2a1c781b8390123e" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_14c9ce53a2c2a1c781b8390123e"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_78597268621a8df3476d38313c2"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_bd5387c23fb40ae7e3526ad75ea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce5225c17497c5adddc1819c69"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f20503eb78cfdac5f8eda342c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_03dcebc1ab44daa177ae9479c4"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."events_category_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_230b925048540454c8b4c481e1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a922b820eeef29ac1c6800e826"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_775c9f06fc27ae3ff8fb26f2c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c884e321f927d5b86aac7c8f9e"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2f7b823a21562eeca20e72b00"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32b41cdb985a296213e9a928b5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f65f62084af2ebfbe39f8955b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1237daf748b7653a6ebb9492fe"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3bd77e06fb9312d22944b1630"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_12b901b34113688b4786368510"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_efa6c4f84fb295c3dac56e43a6"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_type_enum"`);
    }

}
