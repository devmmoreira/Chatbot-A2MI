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

class DeletePaymentService {
    public async execute({ user_id, id }: Request): Promise<void> {
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
        
        await paymentsRepository.delete(existPayment)
    }
}

export default DeletePaymentService