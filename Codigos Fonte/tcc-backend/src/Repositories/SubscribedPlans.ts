import { EntityRepository, Repository, getRepository } from 'typeorm'

import AppError from '../errors/AppError'

import SubscribedPlans from '../Models/SubscribedPlans'
import Products from '../Models/Products'

interface SubscribePlanDTO{
    id_user: string
    id_product: string
}

@EntityRepository(SubscribedPlans)
export default class SubscribedPlansRepository extends Repository<SubscribedPlans>{
    async getAsigendPlans({ userId }: { userId: string }): Promise<Array<Products>>{
        const plans = (await this.find({
            join: { alias: "subscribedplans" },
            where: { id_user: userId }
        })).map(plan => plan.id_product)

        if(plans.length <= 0){
            throw new AppError("Você não possui produtos assinados", 404)
        }

        const productRepository = getRepository(Products)
        const detailsPlans: Array<Products> = []

        for(let planId of plans){
            const productDetail = await productRepository.findOne({ where: { id: planId }})
            if(productDetail) { detailsPlans.push(productDetail)}
        }

        return detailsPlans
    }

    async deletePlan({ id_product, id_user }: SubscribePlanDTO){
        try{
            const product = await this.findOne({
                where:{
                    id_user,
                    id_product
                }
            })

            if(!product){ throw new AppError("Esse produto não foi encontrado", 404) }

            await this.delete(product)
        }catch(err: any){
            console.log(err)
            throw new Error("Não foi possivel remover o plano, tente novamente mais tarde")
        }

    }
}