import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1681115403524 implements MigrationInterface {
  name = "InitialMigration1681115403524";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userIdId" uuid, CONSTRAINT "PK_8dadaa0dc6305d95e1d1a6b9544" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "clientIdId" uuid, CONSTRAINT "PK_68782cec65c8eef577c62958273" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Clients" ADD CONSTRAINT "FK_d7ea55b2c7abc8e8d54d2d8bfec" FOREIGN KEY ("userIdId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Contacts" ADD CONSTRAINT "FK_82506deaf7efc0099c62d81de72" FOREIGN KEY ("clientIdId") REFERENCES "Clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Contacts" DROP CONSTRAINT "FK_82506deaf7efc0099c62d81de72"`
    );
    await queryRunner.query(
      `ALTER TABLE "Clients" DROP CONSTRAINT "FK_d7ea55b2c7abc8e8d54d2d8bfec"`
    );
    await queryRunner.query(`DROP TABLE "Contacts"`);
    await queryRunner.query(`DROP TABLE "Clients"`);
    await queryRunner.query(`DROP TABLE "Users"`);
  }
}
