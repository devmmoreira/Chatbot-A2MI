import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableProducts1630015522711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Products",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "mediumtext",
                    isNullable: false
                },
                {
                    name: "image",
                    type: "mediumtext",
                    isNullable: false
                },
                {
                    name: "price",
                    type: "decimal",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "datetime",
                    isNullable: false
                },
                {
                    name: "updated_at",
                    type: "datetime",
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Products", true)
    }

}
