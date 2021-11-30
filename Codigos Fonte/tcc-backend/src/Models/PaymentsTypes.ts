import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column
  } from 'typeorm'
  
  @Entity("paymentstypes")
  class PaymentsTypes {
  
    @PrimaryGeneratedColumn("uuid")
    id: string
  
    @Column()
    name: string
  }
  
  export default PaymentsTypes;