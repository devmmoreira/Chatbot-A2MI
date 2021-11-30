import AppError from "../errors/AppError"
import { getRepository, getCustomRepository } from "typeorm"
import { v4 as uuid } from "uuid"

import Payments from "../Models/Payments"
import PaymentsTypes from "../Models/PaymentsTypes"

import UserRepository from "../Repositories/UserRepository"

interface Request{
    user_id: string
    title: string
    value: number
    type: string
    dueDate: Date
}

class CreatePaymentService {
    public async execute({user_id, title, value, type, dueDate }: Request): Promise<Omit<Payments, "user" | "type_id">> {
        const paymentsRepository = getRepository(Payments)
        const paymentsTypesRepository = getRepository(PaymentsTypes)
        const userRepository = getCustomRepository(UserRepository)

        const existuser = await userRepository.findOne({
            where: { id: user_id }
        })

        if(!existuser){
            throw new AppError("Este usuário não existe", 404)
        }

        let paymentType = await paymentsTypesRepository.findOne({
            where: { name: type}
        })

        if(!paymentType){
            paymentType = paymentsTypesRepository.create({
                id: uuid(),
                name: type
            })

            await paymentsTypesRepository.save(paymentType)
        }

        if(new Date(dueDate) < new Date()){
            throw new AppError("Data Inválida, não é possível agendar um pagamento para um dia que já passou", 400)
        }

        const payment = paymentsRepository.create({
            id: uuid(),
            title,
            value,
            dueDate,
            status: "open",
            type: paymentType,
            user: existuser
        })
        
        await paymentsRepository.save(payment)

        return {
            id: payment.id,
            user_id: payment.user_id,
            title: payment.title,
            value: payment.value,
            status: payment.status,
            dueDate: payment.dueDate,
            created_at: payment.created_at,
            updated_at: payment.updated_at,
            type: payment.type
        }
    }
}

export default CreatePaymentService