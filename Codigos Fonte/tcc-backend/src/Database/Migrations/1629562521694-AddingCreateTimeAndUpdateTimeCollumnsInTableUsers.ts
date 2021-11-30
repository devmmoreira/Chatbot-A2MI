import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddingCreateTimeAndUpdateTimeCollumnsInTableUsers1629562521694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("Users", new TableColumn({
            name: "created_at",
            type: "datetime"
        }))

        await queryRunner.addColumn("Users", new TableColumn({
            name: "updated_at",
            type: "datetime"
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("Users", "updated_at")
        await queryRunner.dropColumn("Users", "created_at")
    }

}
