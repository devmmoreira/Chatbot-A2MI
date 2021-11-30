import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity("Users")
class Users{

    @PrimaryColumn()
    id: string

    @Column()
    fullname: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column()
    date_of_birthy: Date;

    @Column()
    phone: string;

    @Column()
    cpf_cnpj: string;

    @Column()
    email: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Users