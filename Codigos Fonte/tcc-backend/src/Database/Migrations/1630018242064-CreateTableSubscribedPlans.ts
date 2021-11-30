import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableSubscribedPlans1630018242064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "SubscribedPlans",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false
                },
                {
                    name: "id_user",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "id_product",
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
            ],
            foreignKeys: [
                {
                    columnNames: ['id_user'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Users',
                    onUpdate: 'CASCADE'
                },
                {
                    columnNames: ['id_product'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Products',
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("SubscribedPlans", "id_product")
        await queryRunner.dropForeignKey("SubscribedPlans", "id_user")
        await queryRunner.dropTable("SubscribedPlans", true)
    }

}
