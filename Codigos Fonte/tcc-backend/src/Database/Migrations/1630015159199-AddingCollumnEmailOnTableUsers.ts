import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddingCollumnEmailOnTableUsers1630015159199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("Users", new TableColumn({
            name: "email",
            type: "varchar",
            isNullable: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("Users", "email")
    }

}
