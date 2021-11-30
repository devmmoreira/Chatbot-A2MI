import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddingFKAtPaymentsTypesInPayments1638045587238 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("payments", new TableColumn({
            name: "type_id",
            type: "varchar",
            isNullable: true,
        }))

        await queryRunner.createForeignKey("payments", new TableForeignKey({
            columnNames: ["type_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "paymentstypes",
            name: "PaymentType",
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("payments", "PaymentType")
        await queryRunner.dropColumn("payments", "type_id")
    }

}
