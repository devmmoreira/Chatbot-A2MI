import React from "react"
import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import tccApi from '../../Services/tcc_api'

import { ChatbotConnection, HistoryChatTextModel } from "./types"

import { SendRounded } from '@material-ui/icons'

import LoadingDots from '../../Assets/loadingElipse.svg'

import { ChatWithChatbot, ChatBalloon } from './style'


const A2miChatBot: React.FC = () => {

    const history = useHistory()

    const [inputIdle, setInputIdle] = useState<number>(0)
    const [inputIdleIntervalID, setInputIdleIntervalID] = useState<NodeJS.Timeout>()
    const [startInputIdleInterval, setStartInputIdleInterval] = useState<boolean>(true)
    const [isReadyToAsk, setIsReadyToAsk] = useState<boolean>(false)

    const [isWriting, setIsWriting] = useState<boolean>(false)
    
    const [userMessages, setUserMessages] = useState<string>("")
    const [chatHistory, setChatHistory] = useState<Array<HistoryChatTextModel>>([{
        messagetype: "text",
        origin: "bot",
        from: "ChatBot",
        text: "Bem Vindo!!! Eu sou o bot da A2Mi, em que posso te ajudar???"
    }])

    const [chatBotData, setChatbotData] = useState<ChatbotConnection>({
        sessionId: "",
        status: 0,
        statusText: ""
    })

    const chatInputRef = useRef<HTMLInputElement>(null)

    const askForChatbot = async () => {

        if(userMessages === "") return

        try{
            setIsWriting(true)
            setStartInputIdleInterval(false)
            setInputIdle(0)

            console.log(userMessages)

            const botResponse = await tccApi.post("/wtBot/chat/527ce527-204d-466f-9861-33ab10d73f1f", {
                sessionId: chatBotData.sessionId,
                input: {
                    message_type: "text",
                    text: userMessages
                }
            })
            console.log(botResponse.data.result.output)

            const botMessages = botResponse.data.result.output.generic.slice(0).reverse().map((message: any) => {
                if(message.response_type === "text"){
                    return {
                        messagetype: "text",
                        origin: "bot",
                        from: "ChatBot",
                        text: message.text
                    }
                }
                
                if(message.response_type === "option"){
                    return {
                        messagetype: "option",
                        origin: "bot",
                        from: "",
                        text: message.title,
                        options: message.options
                    }
                }

                return {
                    messagetype: "text",
                    origin: "bot",
                    from: "ChatBot",
                    text: message.text
                }
            })

            setChatHistory(prev => [...botMessages, ...prev])
            setUserMessages("")

            setIsWriting(false)
        } catch(err){
            console.log(err)

            setChatHistory(prev => [{
                messagetype: "text",
                origin: "bot",
                from: "Chatbot",
                text: "Poderia tentar novamente?"
            }, ...prev])
            
            setIsWriting(false)
            setUserMessages("")
        }
    }

    const sendText = async () => {
        setInputIdle(0)
        setStartInputIdleInterval(true)

        if(chatInputRef && chatInputRef.current){
            if(chatInputRef.current.value !== ""){
                const messageText = chatInputRef.current.value
                chatInputRef.current.value = ""

                setChatHistory(prev => [{
                    messagetype: "text",
                    origin: "user",
                    from: "User",
                    text: messageText
                }, ...prev])

                setUserMessages(prev => `${ prev } ${ messageText }`)

                chatInputRef.current.value = ""
            } else{
                setStartInputIdleInterval(false)
                setInputIdle(0)
            }
        }
    }

    const redirectOptions = (responseMessage: string) => async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()
        setUserMessages(responseMessage)

        await askForChatbot()
        
        setTimeout(() => {
            history.push(responseMessage)
        },5000)
    }

    useEffect(() => {
        if(!startInputIdleInterval){
            if(inputIdleIntervalID !== undefined){
                clearInterval(inputIdleIntervalID)
            }
        } else if(startInputIdleInterval){
            const intervalId = setInterval(() => {
                setInputIdle(prev => prev + 1)
            }, 1000)
    
            setInputIdleIntervalID(intervalId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[startInputIdleInterval])

    useEffect(() => {
        if(inputIdle >= 3 && isReadyToAsk){
            setStartInputIdleInterval(false)
            askForChatbot()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputIdle, isReadyToAsk])

    useEffect(() => {
        tccApi.get("/wtBot/connect/527ce527-204d-466f-9861-33ab10d73f1f")
            .then(response => {
                setChatbotData({
                    status: response.data.status,
                    statusText: response.data.statusText,
                    sessionId: response.data.result.session_id
                })
            })
            .then(() =>{
                setIsReadyToAsk(true)
                setInputIdle(0)
            })
            .catch(error => {
                console.log(error)

                setChatHistory(prev => [{
                    messagetype: "text",
                    origin: "bot",
                    from: "Chatbot",
                    text: "Estou meio lerdo pra pensar"
                }, ...prev])
            })
    },[])

    return(
        <ChatWithChatbot>
            <div className="texting">
                {
                    chatHistory.map((message, index) => (
                        <ChatBalloon key={ index } type={ message.origin }>
                            <p className="balloon-title">{ message.from }</p>
                            {
                                (message.messagetype === "text") && <p className="balloon-message">{ message.text }</p>
                            }
                            {
                                (message.messagetype === "option")&&
                                <div className="balloon-options">
                                    {
                                        (message.options)&&
                                        message.options.map((option, index) => (
                                            <button
                                                key={ index }
                                                className="options" 
                                                type="button" 
                                                onClick={ redirectOptions(option.value.input.text) }
                                            >
                                                { option.label }
                                            </button>
                                        ))
                                    }
                                </div>
                            }

                        </ChatBalloon>
                    ))
                }
            </div>
            {
                (isWriting) && <img src={ LoadingDots } alt="loading"/>
            }
            <div className="send-text">
                <input 
                    ref={ chatInputRef } 
                    type="text" 
                    onKeyPress={ event => {
                        if(event.which === 13){
                            sendText()
                        }
                    }}
                    onChange={ () => setInputIdle(0) }
                />
                <button onClick={ () => sendText() }>
                    <SendRounded />
                </button>
            </div>
        </ChatWithChatbot>
    )
}

export default A2miChatBot