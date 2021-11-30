import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableChatbots1630016070232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Chatbots",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "api_key",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "varchar",
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
        await queryRunner.dropTable("Chatbots", true)
    }

}
