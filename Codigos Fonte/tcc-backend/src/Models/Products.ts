import { Entity , PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity("Products")
export default class Products{
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    image: string

    @Column()
    price: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}