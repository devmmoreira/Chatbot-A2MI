import { Router, Request, Response} from 'express'
import { getCustomRepository, getRepository } from 'typeorm'
import multer from 'multer'

import UploadConfig from '../Config/UploadFile'

const upload = multer(UploadConfig)

import VerifyUserAuthentication from '../Middlewares/VerifyUserAuthentication'
import VerifyCfgUserAuthentication from '../Middlewares/VerifyCfgUserAuthentication'

import Products from '../Models/Products'

import SubscribedPlansRepository from '../Repositories/SubscribedPlans'
import ProductsRepository from '../Repositories/ProductsRepository'

import SubscribePlanService from '../Services/SubscribePlanService'

const ProductRoutes = Router()

ProductRoutes.get("/", async (request: Request, response: Response) => {
    const productsRepository = getRepository(Products)

    try{
        const products = await productsRepository.find({
            select: [
                'id',
                'name',
                'description',
                'price',
                'image'
            ],
            order: {
                created_at: "DESC"
            }
        })

        if(products.length > 0){
            return response.status(200).json(products)
        } else{
            return response.status(404).json({
                err: "Not Found",
                message: "Nothing products has found"
            })
        }

    }catch (err: any){
        return response.status(500).json({
            err: "Internal Server Error",
            message: err.message
        })
    }
})

ProductRoutes.get("/userplans/:userId", VerifyUserAuthentication, async (resquest: Request, response: Response) => {
    try{
        const { userId } = resquest.params

        const subscribedplansRepository = getCustomRepository(SubscribedPlansRepository)
        const plans = await subscribedplansRepository.getAsigendPlans({ userId })

        return response.status(200).json(plans)
    }catch(error: any){
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

ProductRoutes.post("/subscribe", VerifyCfgUserAuthentication, async (resquest: Request, response: Response) => {
    try{
        console.log(resquest.body)
        const subscribePlanService = new SubscribePlanService()
        await subscribePlanService.execute(resquest.body)

        return response.status(200).json({ status: "Success", message: "Plano Adicionado" })
    }catch(error: any){
        console.log(error)
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

ProductRoutes.post("/add-new", VerifyCfgUserAuthentication, upload.single('file'), async(request: Request, response: Response) => {
    try{
        const body = JSON.parse(request.body.info)
        const filePath = request.file?.path

        const productRepoistory = getCustomRepository(ProductsRepository)
        const newProduct = await productRepoistory.addNewProduct({ ...body, image: filePath })

        return response.status(200).json(newProduct)
    } catch(error: any){
        console.log(error)
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

ProductRoutes.put("/update/:id", VerifyCfgUserAuthentication, upload.single('file'), async(request: Request, response: Response) => {
    try{
        const body = JSON.parse(request.body.info)
        const filePath = request.file?.path
        const { id } = request.params

        console.log(filePath)

        const productRepoistory = getCustomRepository(ProductsRepository)
        const updatedProduct = await productRepoistory.updateProduct({ id, image: filePath || "", ...body })

        return response.status(200).json(updatedProduct)
    }  catch(error: any){
        console.log(error)
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

ProductRoutes.delete("/unsubscribe", VerifyCfgUserAuthentication, async (resquest: Request, response: Response) => {
    try{
        const subscribedplansRepository = getCustomRepository(SubscribedPlansRepository)

        await subscribedplansRepository.deletePlan(resquest.body)
        return response.status(200).json({ status: "Success", message: "Plano removido" })
    }catch(err: any){
        console.log(err)
        return response.status(400).json({ err: "Invalid", message: err.message })
    }
})

export default ProductRoutes