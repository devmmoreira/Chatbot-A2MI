import { MigrationInterface, QueryRunner } from "typeorm";

import Users from "../../Models/UserModel"

export class AddingAdminUser1637420541732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder()
            .insert()
            .into(Users)
            .values([
                {
                    id: "62d00c23-b98a-4b30-8c52-6d78a128faef",
                    cpf_cnpj: "xxxxxxxxxxxxxx",
                    date_of_birthy: "2000-06-09",
                    email: "contato@a2mi.com.br",
                    fullname: "Admin",
                    username: "a2mi@admin",          
                    password: "$2a$08$E1iioF5FSn7VbBiXoJ9esugjY7eZgkI1gfHS2seV.7Xmj7FO/JZaO", //A2m!*74@#
                    phone: "40028922",
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ])
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder()
            .delete()
            .from(Users)
            .where("id = 62d00c23-b98a-4b30-8c52-6d78a128faef")
            .execute()
    }

}
