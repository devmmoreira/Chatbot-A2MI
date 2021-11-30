import { Response, SessionResponse } from 'ibm-watson/assistant/v2'
import WatsonAssistantRepository from '../Repositories/WatsonAssistantRepository'

export default class ConnectChatbotService {

    constructor(private watsonAssistant: WatsonAssistantRepository){}

    async execute(): Promise<Response<SessionResponse>>{
        try {
            const connection = await this.watsonAssistant.assistantConnect()
            return connection
        } catch (error: any) {
            throw new Error(error)
        }
    }
}