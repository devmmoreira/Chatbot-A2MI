import AppError from "../errors/AppError"
import { getCustomRepository } from "typeorm"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { JWTConfig } from '../Config/JWTConfig'

import UserRepository from "../Repositories/UserRepository"

interface RequestAuthUser{
    username: string,
    password: string
}

interface ResponseAuthUser{
    user: {
        username: string
    },
    token: string
}

export default class AuthenticateCfgUserService{
    async execute({ username, password }: RequestAuthUser): Promise<ResponseAuthUser>{
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({
            where: { username: username }
        })

        if(!user){
            throw new AppError("Esse usuário não existe", 404)
        }

        if(!(user.id === "62d00c23-b98a-4b30-8c52-6d78a128faef")){
            throw new AppError("Usuário Inválido", 401)
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error ("Email/Password não está batendo, tente novamente")
        }

        const token = sign({}, JWTConfig.signKey , {
            subject: user.id,
            expiresIn: "1d",
            keyid: "62d00c23-b98a-4b30-8c52-6d78a128faef"
        })

        return {
            user:{
                username: user.username
            },
            token
        }
    }
}