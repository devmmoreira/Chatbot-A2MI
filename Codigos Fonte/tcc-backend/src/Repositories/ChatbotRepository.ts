import { EntityRepository, Repository, getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError' 

import { v4 as uuid } from 'uuid'

import Chatbot from '../Models/Chatbot'

import UserRepository from '../Repositories/UserRepository'

interface RequestChatbot{
    user_id: string
    api_key: string
    name: string
    description: string
}

@EntityRepository(Chatbot)
export default class ChatbotRepository extends Repository<Chatbot>{
    async addNewChatBot({ user_id, api_key, name, description }: RequestChatbot): Promise<Omit<Chatbot, "user">>{
        const userRepository = getCustomRepository(UserRepository)

        const existUser = await userRepository.findOne({
            where: { id: user_id }
        }) 

        if(!existUser) { throw new AppError("Esse usuário não existe", 404) }

        const existBot = await this.findOne({
            where: { api_key: api_key }
        })

        if(!!existBot) { throw new AppError("Esse chatbot já está sendo utilizado por outro usuário", 400) }

        const newChatBot = this.create({
            id: uuid(),
            api_key: api_key,
            user: existUser,
            name,
            description,
            created_at: new Date(),
            updated_at: new Date()
        })

        await this.save(newChatBot)

        return {
            id: newChatBot.id,
            api_key: newChatBot.api_key,
            user_id: newChatBot.user.id,
            name: newChatBot.name,
            description: newChatBot.description,
            created_at: newChatBot.created_at,
            updated_at: newChatBot.updated_at
        }
    }

    async removeChatBot({ user_id, api_key }: RequestChatbot): Promise<void>{
        const userRepository = getCustomRepository(UserRepository)

        const existUser = await userRepository.findOne({
            where: { id: user_id }
        }) 

        if(!existUser) { throw new AppError("Esse usuário não existe", 404) }

        const existBot = await this.findOne({
            where: { api_key: api_key, user_id: user_id }
        })

        if(!existBot) { throw new AppError("Esse não existe", 404) }

        await this.delete(existBot)
    }

    async updateChatBot({ user_id, api_key, name, description }: RequestChatbot): Promise<Omit<Chatbot, "user">>{
        const existChatBot = await this.findOne({
            where:{
                user_id,
                api_key
            }
        })

        if(!existChatBot){ throw new AppError("Chatbot Inexistente", 404) }

        const updateChatBot: Omit<Chatbot, "user"> = {
            id: existChatBot.id,
            user_id: existChatBot.user_id,
            api_key: existChatBot.api_key,
            name: (name)? name : existChatBot.name,
            description: (description)? description : existChatBot.description,
            created_at: existChatBot.created_at,
            updated_at: new Date()
        }

        await this.save(updateChatBot)

        return updateChatBot
    }
}