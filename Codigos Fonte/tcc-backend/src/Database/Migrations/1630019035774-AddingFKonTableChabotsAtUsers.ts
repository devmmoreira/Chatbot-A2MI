import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddingFKonTableChabotsAtUsers1630019035774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("Chatbots", new TableColumn({
            name: "user_id",
            type: "varchar",
            isNullable: false
        }))

        await queryRunner.createForeignKey("Chatbots", new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: "Users",
            onUpdate: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("Chatbots", "user_id")
        await queryRunner.dropColumn("Chatbots", "user_id")
    }

}
