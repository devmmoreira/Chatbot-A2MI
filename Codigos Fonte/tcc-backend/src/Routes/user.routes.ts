import { Router, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import UserRepository from '../Repositories/UserRepository'
import SubscribedPlansRepository from '../Repositories/SubscribedPlans'

import AuthenticateClientUserService from '../Services/AuthenticateClientUserService'
import AuthenticateCfgUserService from '../Services/AuthenticateCfgUserService'

import VerifyUserAuthentication from '../Middlewares/VerifyUserAuthentication'
import VerifyCfgUserAuthentication from '../Middlewares/VerifyCfgUserAuthentication'

const UsersRouters = Router()

UsersRouters.get("/", VerifyCfgUserAuthentication, async (request: Request, response: Response): Promise<any> => {
    const userRepository = getCustomRepository(UserRepository)

    try{
        const users = await userRepository.find({
            select: [
                "id", 
                "username",
                "email",
                "fullname",
                "phone"
            ]
        })

        return response.status(200).json(users)
    } catch(error: any){
        return response.status(400).json({ message: error.message})
    }
})

UsersRouters.get("/get-user/:id", VerifyUserAuthentication ,async (request: Request, response: Response): Promise<any> => {
    const { id } = request.params

    const userRepository = getCustomRepository(UserRepository)

    try{
        const userData = await userRepository.findOne({
            select: [
                "id",
                "username",
                "fullname",
                "cpf_cnpj", //ver um jeito de criptografar o cpf
                "date_of_birthy",
                "phone",
                "email"
            ],
            where: { id }
        })

        if(userData){
            return response.status(200).json(userData)
        } else{
            return response.status(404).json({ message: "User not found"})
        }

    } catch(error: any){
        return response.status(500).json({ message: error.message })
    }
})

UsersRouters.get("/cfg/user-info/:id", VerifyCfgUserAuthentication ,async (request: Request, response: Response): Promise<any> => {
    const { id } = request.params

    const userRepository = getCustomRepository(UserRepository)

    try{
        const userData = await userRepository.findOne({
            select: [
                "id",
                "username",
                "fullname",
                "cpf_cnpj", //ver um jeito de criptografar o cpf
                "date_of_birthy",
                "phone",
                "email"
            ],
            where: { id }
        })

        if(userData){
            const subscribedplansRepository = getCustomRepository(SubscribedPlansRepository)
            try{
                const plans = await subscribedplansRepository.getAsigendPlans({ userId: id })
    
                return response.status(200).json({...userData, asignedProducts: plans })
            }catch{
                return response.status(200).json({...userData, asignedProducts: [] })
            }
        } else{
            return response.status(404).json({ message: "User not found"})
        }

    } catch(error: any){
        return response.status(500).json({ message: error.message })
    }
})

UsersRouters.post("/create", async (request: Request, response: Response): Promise<any> => {
    const userRepository = getCustomRepository(UserRepository)

    try{
        await userRepository.createUser(request.body)
        return response.status(200).json({ message: "User created with success"})
    }catch(error: any){
        console.log(error.message)
        return response.status(400).json({ message: error.message })
    }
})

UsersRouters.post("/authenticate", async (request: Request, response: Response): Promise<any> => {
    const authenticateClientUserService = new AuthenticateClientUserService()

    try{
        const userAthentication = await authenticateClientUserService.execute(request.body)
        return response.status(200).json(userAthentication)
    } catch(error: any){
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

UsersRouters.post("/cfg/authenticate", async (request: Request, response: Response): Promise<any> => {
    const authenticateCfgUserService = new AuthenticateCfgUserService()

    try{
        const userAthentication = await authenticateCfgUserService.execute(request.body)
        return response.status(200).json(userAthentication)
    } catch(error: any){
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

UsersRouters.put("/update", VerifyUserAuthentication, async (request: Request, response: Response): Promise<any> => {
    const userRepository = getCustomRepository(UserRepository)

    try{
        const updatedUser = await userRepository.updateUser(request.body)
        return response.status(200).json(updatedUser)
    } catch(error: any){
        console.log(error.message)
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})


export default UsersRouters