import WatsonAssistant from '../Apis/IBMWatson'
import { validate } from 'uuid'

import Assistant from '../Models/Assistant'
import AssistantMessage from '../Models/AssistantMessage'

export default class ChatBot{

    constructor(private assistant: Assistant){}

    async assistantConnect(){

        if(!validate(this.assistant.assistantId)){
            throw new Error("Is not valid Assistant ID")
        }

        try{
            const assistant = await WatsonAssistant.createSession({ assistantId: this.assistant.assistantId })
            console.log(assistant.result)
            return assistant
        } catch(err: any){
            console.log(err)
            throw new Error(err.message)
        }
    }

    async sendMessage(message: AssistantMessage){
        try {
            const assistantResponse = await WatsonAssistant.message( message )
            console.log(assistantResponse)
            return assistantResponse
        } catch (err: any) {
            console.log(err)
            throw new Error(err)
        }
    }
}