import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddFKUsersOnTablePayments1638047007989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("payments", new TableColumn({
            name: "user_id",
            type: "varchar",
            isNullable: false
        }))

        await queryRunner.createForeignKey("payments", new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: "Users",
            onUpdate: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("payments", "user_id")
        await queryRunner.dropColumn("payments", "user_id")
    }

}
