import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, Column } from 'typeorm'

import User from './UserModel'
import Product from './Products'

@Entity("subscribedplans")
export default class SubscribedPlans{

    @PrimaryGeneratedColumn("increment")
    id: number
    
    @ManyToMany(() => User)
    @JoinTable({ 
        name: "users",
        joinColumn: {
            name: "id",
            referencedColumnName: "id_user"
        },
        inverseJoinColumn: {
            name: "id_user",
            referencedColumnName: "id"
        }
    })
    user: Array<User>

    @Column()
    id_user: string

    @ManyToMany(() => Product)
    @JoinTable({ 
        name: "products",
        joinColumn: {
            name: "id",
            referencedColumnName: "id_product"
        },
        inverseJoinColumn: {
            name: "id_product",
            referencedColumnName: "id"
        }
    })
    product: Array<Product>

    @Column()
    id_product: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}