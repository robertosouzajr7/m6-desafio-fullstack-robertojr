import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1683566500668 implements MigrationInterface {
    name = 'InitialMigration1683566500668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "clientsId" uuid, CONSTRAINT "PK_68782cec65c8eef577c62958273" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, CONSTRAINT "UQ_38fd02fc8a88ed82f0c1e6eee4e" UNIQUE ("email"), CONSTRAINT "PK_8dadaa0dc6305d95e1d1a6b9544" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD CONSTRAINT "FK_46ca144ff357cfcc7b3360614b0" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP CONSTRAINT "FK_46ca144ff357cfcc7b3360614b0"`);
        await queryRunner.query(`DROP TABLE "Clients"`);
        await queryRunner.query(`DROP TABLE "Contacts"`);
    }

}
