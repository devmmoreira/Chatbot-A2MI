import { Router, Request, Response } from 'express'
import { getRepository, QueryRunner } from 'typeorm'

import Payments from '../Models/Payments'

import CreatePaymentService from '../Services/CreatePaymentService'
import UpdatePaymentService from '../Services/UpdatePaymentStatusServices'

import VerifyUserAuthentication from '../Middlewares/VerifyUserAuthentication'
import VerifyCfgUserAuthentication from '../Middlewares/VerifyCfgUserAuthentication'
import DeletePaymentService from '../Services/DeletePaymentService'

const PaymentRoutes = Router()

PaymentRoutes.get('/:user_id', VerifyUserAuthentication, async(request: Request, response: Response) => {
    const paymentsRepository = getRepository(Payments)
    const { user_id } = request.params
    
    try{
        const payments = await paymentsRepository.find({
            where: { user_id },
            order: {
                dueDate: "DESC"
            }
        })

        return response.status(200).json(payments)

    } catch(error: any){
        console.log(error)
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

PaymentRoutes.get('/cfg/:user_id', VerifyCfgUserAuthentication, async(request: Request, response: Response) => {
    const paymentsRepository = getRepository(Payments)
    const { user_id } = request.params
    try{
        const payments = await paymentsRepository.find({
            where: { user_id }
        })

        return response.status(200).json(payments)
    } catch(error: any){
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

PaymentRoutes.post('/add', VerifyCfgUserAuthentication, async(request: Request, response: Response) => {
    const createPaymentService = new CreatePaymentService()
    try{
        const newPayment = await createPaymentService.execute(request.body)

        return response.status(200).json(newPayment)
    } catch(error: any){
        console.log(error)
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

PaymentRoutes.put('/update', VerifyCfgUserAuthentication, async(request: Request, response: Response) => {
    const updatePaymentService = new UpdatePaymentService()
    try{
        const updatedPayment = await updatePaymentService.execute(request.body)

        return response.status(200).json(updatedPayment)
    } catch(error: any){
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

PaymentRoutes.delete('/delete', VerifyCfgUserAuthentication, async(request: Request, response: Response) => {
    const deletePaymentService = new DeletePaymentService
    
    try{

        await deletePaymentService.execute(request.body)

        return response.status(204).json()

    } catch(error: any){
        console.log(error)
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

export default PaymentRoutes