import {MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUsersAddingCNPJFieldAtCPF1629329594111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {    
        await queryRunner.query(`ALTER TABLE Users CHANGE COLUMN cpf cpf_cnpj varchar(20)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE Users CHANGE COLUMN cpf_cnpj cpf varchar(20)`)
    }

}
