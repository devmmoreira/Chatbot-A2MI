import { getCustomRepository, getRepository } from "typeorm"
import AppError from "../errors/AppError"

import Products from "../Models/Products"

import UserRepository from "../Repositories/UserRepository"
import SubscribedPlansRepository from '../Repositories/SubscribedPlans'

interface SubscribeRequest{
    id_user: string
    id_product: Array<string>
}

export default class SubscribePlanService{
    async execute({ id_user, id_product }: SubscribeRequest): Promise<void>{
        const userRepository = getCustomRepository(UserRepository)
        const subscribedplansRepository = getCustomRepository(SubscribedPlansRepository)
        const productRepository = getRepository(Products)

        const existUser = await userRepository.findOne({
            where: { id: id_user }
        })

        if(!existUser){ throw new AppError("Esse usuário é inválido", 400) }

        for(let productIndex = 0; productIndex < id_product.length; productIndex++){
            const existProduct = await productRepository.findOne({
                where: { id: id_product[productIndex] }
            })

            if(existProduct){
                const isSubsCribed = await subscribedplansRepository.findOne({
                    where: { id_product: id_product[productIndex], id_user: id_user }
                })

                if(!isSubsCribed){
                    const CreateDate = new Date()
            
                    const newID = (await subscribedplansRepository.count()) + 1
            
                    await subscribedplansRepository.save({
                        id: newID,
                        id_user,
                        id_product: id_product[productIndex],
                        created_at: CreateDate,
                        updated_at: CreateDate
                    })
                }
            }
        }
    }
}