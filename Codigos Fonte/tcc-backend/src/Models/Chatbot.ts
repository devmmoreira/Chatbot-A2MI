import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

import Users from "./UserModel"

@Entity("Chatbots")
export default class Chatbot{

    @PrimaryColumn()
    id: string

    @Column()
    api_key: string

    @ManyToOne(() => Users)
    @JoinColumn({ name: "user_id" })
    user: Users

    @Column()
    user_id: string

    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}