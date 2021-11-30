import { EntityRepository, Repository } from 'typeorm'
import { hash } from 'bcryptjs'
import { v4 } from 'uuid'
import AppError from '../errors/AppError'

import UserEntity from '../Models/UserModel'

import ValidateCPFService from '../Services/ValidateCPfService'
import ValidateCNPJService from '../Services/ValidateCNPJService'

interface RequestUser{
    id: string
    username: string
    password: string
    fullname: string
    date_of_birthy: Date
    phone: string
    cpf_cnpj: string
    email: string
}

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity>{
    public async createUser({ username, password, fullname, phone, cpf_cnpj, date_of_birthy, email }: RequestUser): Promise<void>{
        const validateCPFService = new ValidateCPFService()
        const validateCNPJService = new ValidateCNPJService()

        if(cpf_cnpj.length === 11){
            if(!validateCPFService.execute(cpf_cnpj)){
                throw new AppError("Esse não é um cpf válido", 400)
            }
        } else if(cpf_cnpj.length === 14){
            if(!validateCNPJService.execute(cpf_cnpj)){
                throw new AppError("Esse não é um CNPJ válido", 400)
            }
        } else{
            throw new AppError("Esse não é um cpf/cnpj", 400)
        }
        
        const existUser = await this.findOne({
            where: { email }
        })
        
        if(existUser){
            throw new AppError("Esse usuário já está em uso", 400)
        }

        const existEmail = await this.findOne({
            where: { email }
        })

        if(existEmail){
            throw new AppError("Esse email já está em uso", 400)
        }

        const newPassord = await hash(password, 8)

        const newUser = {
            id: v4(),
            username,
            password: newPassord,
            fullname,
            phone,
            cpf_cnpj,
            date_of_birthy,
            email,
            created_at: new Date(),
            updated_at: new Date()
        }

        await this.save(newUser)
    }

    public async updateUser({id, username, password, fullname, phone, cpf_cnpj, email }: RequestUser): Promise<Omit<RequestUser, "password">>{
        const validateCPFService = new ValidateCPFService()
        const validateCNPJService = new ValidateCNPJService()

        const existUser = await this.findOne({
            where: { id: id }
        })

        if(!existUser){
            throw new AppError("Esse usuário não existe", 404)
        }

        if(cpf_cnpj){
            if(cpf_cnpj.length === 11){
                if(!validateCPFService.execute(cpf_cnpj)){
                    throw new AppError("Esse não é um cpf válido", 400)
                }
            } else if(cpf_cnpj.length === 14){
                if(!validateCNPJService.execute(cpf_cnpj)){
                    throw new AppError("Esse não é um CNPJ válido", 400)
                }
            } else{
                throw new AppError("Esse não é um cpf/cnpj", 400)
            }
        }

        if(email){
            const existEmail = await this.findOne({
                where: { email }
            })
    
            if(existEmail){
                throw new AppError("Esse email já está em uso", 400)
            }
        }

        let currentPassword = existUser.password

        if(password){        
            currentPassword = await hash(password, 8)
        }

        const updatedUser = this.create({
            id: existUser.id,
            username: (username)? username : existUser.username,
            password: currentPassword,
            fullname: (fullname)? fullname : existUser.fullname,
            cpf_cnpj: (cpf_cnpj)? cpf_cnpj : existUser.cpf_cnpj,
            date_of_birthy: existUser.date_of_birthy,
            email: (email)? email : existUser.email,
            phone: (phone)? phone : existUser.phone,
            created_at: existUser.created_at,
            updated_at: new Date()
        })


        await this.save(updatedUser)

        return {
            id: updatedUser.id,
            username: updatedUser.username,
            fullname: updatedUser.fullname,
            cpf_cnpj: updatedUser.cpf_cnpj,
            date_of_birthy: updatedUser.date_of_birthy,
            email: updatedUser.email,
            phone: updatedUser.phone
        }
    }
}

export default UserRepository