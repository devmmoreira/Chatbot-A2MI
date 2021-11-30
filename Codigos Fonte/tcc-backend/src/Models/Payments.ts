import { 
    Entity, 
    PrimaryColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne, 
    JoinColumn 
} from 'typeorm'
  
import Users from './UserModel'
import PaymentsTypes from './PaymentsTypes'
  
@Entity("payments")
class Payments {
  
    @PrimaryColumn()
    id: string
  
    @Column()
    title: string
  
    @Column()
    value: number

    @Column()
    status: "open" | "payed" | "latePayment" | "overdue"

    @Column()
    dueDate: Date
  
    @ManyToOne(() => PaymentsTypes) //Qual Entidade Vou referenciar
    @JoinColumn({ name: "type_id"}) //coluna de relacionamento
    type: PaymentsTypes//elemento referenciado
  
    @Column()
    type_id: string //id referenciado

    @ManyToOne(() => Users)
    @JoinColumn({ name: "user_id" })
    user: Users

    @Column()
    user_id: string
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
}

export default Payments