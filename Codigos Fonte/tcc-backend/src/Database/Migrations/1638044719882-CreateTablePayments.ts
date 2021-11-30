import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTablePayments1638044719882 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "payments",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar"
                },
                {
                    name: "value",
                    type: "decimal",
                    precision: 10,
                    scale: 2
                },
                {
                    name: "status",
                    type: "varchar"
                },
                {
                    name: "dueDate",
                    type: "datetime"
                },
                {
                    name: "created_at",
                    type: "datetime",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "datetime",
                    default: "now()"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payments", true) 
    }

}
