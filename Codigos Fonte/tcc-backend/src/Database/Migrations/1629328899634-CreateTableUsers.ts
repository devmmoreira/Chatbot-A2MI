import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableUsers1629328899634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Users",
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,                   
                },
                {
                    name: 'fullname',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'username',
                    type: 'varchar'
                },
                {
                    name: 'date_of_birthy',
                    type: 'Date'
                },
                {
                    name: 'phone',
                    type: 'varchar'
                },
                {
                    name: 'cpf',
                    type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Users')
    }

}
