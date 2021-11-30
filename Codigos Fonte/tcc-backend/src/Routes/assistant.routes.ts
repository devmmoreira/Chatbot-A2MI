import { Request, Router, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import AssistantMessage from '../Models/AssistantMessage'

import ChatbotRepository from '../Repositories/ChatbotRepository'
import WatsonAssistantRepository from '../Repositories/WatsonAssistantRepository'

import ConnectChatbotService from '../Services/ConnectChatbotService'
import SendChatBotMessageService from '../Services/SendChatBotMessageService'
import VerifyCfgUserAuthentication from '../Middlewares/VerifyCfgUserAuthentication'
import VerifyUserAuthentication from '../Middlewares/VerifyUserAuthentication'

const AssistantRoutes = Router()

AssistantRoutes.get('/connect/:assistantId', async (request: Request, response: Response) => {
    //Request { assistantId: "4ef8b7b9-0e97-44ae-a92a-9b5425f9f7c5" }
    const { assistantId } = request.params

    try{
        const connect = new ConnectChatbotService(new WatsonAssistantRepository({ assistantId }))
        const connectionResponse = await connect.execute()

        return response.status(200).json(connectionResponse)
    } catch(error){
        return response.status(400).json({ error })
    }
})

AssistantRoutes.get('/get-bots/:userID', VerifyUserAuthentication, async (request: Request, response: Response) => {
    const { userID } = request.params
    try{
        const chatbotRepository = getCustomRepository(ChatbotRepository)
        const bots = await chatbotRepository.find({
            where: { user_id: userID }
        })

        if(bots.length <= 0){
            return response.status(404).json({ status: "Not Found", message: "Bots não encontrados" })
        }

        return response.status(200).json(bots)
    } catch(error: any){
        console.log(error)
        return response.status(500)
            .json({ message: "Erro interno, tente novamente mais tarde" })
    }
})

AssistantRoutes.post('/chat/:assistantId', async (request: Request, response: Response) => {
    const { assistantId } = request.params
    const message: Omit<AssistantMessage, "assistantId"> = request.body

    try {
        const sendMessage = new SendChatBotMessageService(new WatsonAssistantRepository({ assistantId }))
        const botResponse = await sendMessage.execute({
            assistantId,
            ...message
        })
        return response.status(200).json(botResponse)
    } catch (err) {
        console.log(err)
        return response.status(400).json({err})
    }
})

AssistantRoutes.post('/add-assistant', VerifyCfgUserAuthentication, async (request: Request, response: Response) =>{
    try{
        const chatbotRepository = getCustomRepository(ChatbotRepository)
        const newChatBot = await chatbotRepository.addNewChatBot(request.body)

        return response.status(200).json(newChatBot)
    } catch(error: any){
        console.log(error)
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

AssistantRoutes.put('/update-assistant', VerifyCfgUserAuthentication, async (request: Request, response: Response) =>{
    try{
        const chatbotRepository = getCustomRepository(ChatbotRepository)
        const updatedChatBot = await chatbotRepository.updateChatBot(request.body)

        return response.status(200).json(updatedChatBot)
    } catch(error: any){
        console.log(error)
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

AssistantRoutes.delete('/remove-assistant', VerifyCfgUserAuthentication, async (request: Request, response: Response) =>{
    try{
        const chatbotRepository = getCustomRepository(ChatbotRepository)
        await chatbotRepository.removeChatBot(request.body)

        return response.status(204).json()
    } catch(error: any){
        console.log(error)
        return response.status(error?.statusCode ? error.statusCode : 500)
            .json({ message: error?.statusCode ? error.message : "Erro interno, tente novamente mais tarde" })
    }
})

export default AssistantRoutes