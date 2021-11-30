import AppError from "../errors/AppError"
import { getRepository, getCustomRepository } from "typeorm"

import Payments from "../Models/Payments"

import UserRepository from "../Repositories/UserRepository"

interface Request{
    id: string
    user_id: string
    title: string
    value: number
    dueDate: Date
    status: "open" | "payed" | "latePayment" | "overdue"
}

class UpdatePaymentService {
    public async execute({ id, user_id, status, value, dueDate }: Request): Promise<Omit<Payments, "user" | "type_id">> {
        const paymentsRepository = getRepository(Payments)
        const userRepository = getCustomRepository(UserRepository)

        const existuser = await userRepository.findOne({
            where: { id: user_id }
        })

        if(!existuser){
            throw new AppError("Este usuário não existe", 404)
        }

        const existPayment = await paymentsRepository.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        })

        if(!existPayment){
            throw new AppError("Este pagamento não existe", 404)
        }

        if(dueDate < new Date()){
            throw new AppError("Data Inválida, não é possível agendar um pagamento para um dia que já passou", 400)
        }

        const updatedPayment = paymentsRepository.create({
            id: existPayment.id,
            title: existPayment.title,
            value: (value)? value : existPayment.value,
            dueDate: (dueDate)? dueDate : existPayment.dueDate,
            status: (status)? status : existPayment.status,
            type: existPayment.type,
            user: existPayment.user,
            created_at: existPayment.created_at,
            updated_at: new Date()
        })
        
        await paymentsRepository.save(updatedPayment)

        return {
            id: updatedPayment.id,
            user_id: updatedPayment.user_id,
            title: updatedPayment.title,
            value: updatedPayment.value,
            status: updatedPayment.status,
            type: updatedPayment.type,
            dueDate: updatedPayment.dueDate,
            created_at: updatedPayment.created_at,
            updated_at: updatedPayment.updated_at
        }
    }
}

export default UpdatePaymentService