import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix1681136289897 implements MigrationInterface {
    name = 'Fix1681136289897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP CONSTRAINT "FK_82506deaf7efc0099c62d81de72"`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD CONSTRAINT "FK_82506deaf7efc0099c62d81de72" FOREIGN KEY ("clientIdId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP CONSTRAINT "FK_82506deaf7efc0099c62d81de72"`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD CONSTRAINT "FK_82506deaf7efc0099c62d81de72" FOREIGN KEY ("clientIdId") REFERENCES "Clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
