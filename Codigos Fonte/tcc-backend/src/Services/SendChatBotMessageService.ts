import AssistantMessage from '../Models/AssistantMessage'
import WatsonAssistantRepository from '../Repositories/WatsonAssistantRepository'

export default class SendChatBotMessageService{
    constructor(private assistant: WatsonAssistantRepository){}

    async execute(message: AssistantMessage){
        try{
            const responseAssistant = await this.assistant.sendMessage(message)
            return responseAssistant
        } catch (err: any){
            console.log(err)
            throw new Error(err)
        }
    }
}