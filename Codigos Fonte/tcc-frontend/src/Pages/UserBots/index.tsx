import React from 'react'
import { useEffect, useState } from 'react'

import api from '../../Services/tcc_api'

import {
    Chatbots,
    ChatbotsCard,
    ChatbotsCardMobile,
    ChatbotsCardMobileField
} from './style'

interface Chatbot{
    id: string
    api_key: string
    user_id: string
    name: string
    description: string,
    created_at: string
    updated_at: string
}

const UserBots: React.FC = () => {

    const [userData] = useState(JSON.parse(localStorage.getItem("userData") || ""))
    const [chatbotsList, setChatbotsList] = useState<Array<Chatbot>>([])

    useEffect(() => {
        if(userData?.user.id){
            api.get(`/wtBot/get-bots/${userData.user.id}`, {
                headers: {
                    Authorization: userData.token
                }
            })
                .then(response => {
                    console.log(response)
                    setChatbotsList(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else{
            alert("Invalid ID Token")
        }
    },[userData.user.id, userData.token])

    return(
        <>
        {
            (chatbotsList.length <= 0) ?
            <h1>Nenhum Chat bot vinculado</h1>
            :
            <Chatbots>
                {
                    chatbotsList.map(bot => (
                        <ChatbotsCard key={ bot.id }>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Criação</th>
                                    <th>Ultima Att.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{ bot.name }</td>
                                    <td>{ bot.description }</td>
                                    <td>{ new Date(bot.created_at).toLocaleString() }</td>
                                    <td>{ new Date(bot.updated_at).toLocaleString() }</td>
                                </tr>
                            </tbody>
                        </ChatbotsCard>
                    ))
                }
                {
                    chatbotsList.map(bot => (
                        <ChatbotsCardMobile key={ bot.id }>
                            <div className="row">
                                <ChatbotsCardMobileField>
                                    <label>Nome</label>
                                    <p>{ bot.name }</p>
                                </ChatbotsCardMobileField>
                                <ChatbotsCardMobileField>
                                    <label>Criação</label>
                                    <p>{ new Date(bot.created_at).toLocaleString() }</p>
                                </ChatbotsCardMobileField>
                                <ChatbotsCardMobileField>
                                    <label>Ultima Att.</label>
                                    <p>{ new Date(bot.updated_at).toLocaleString() }</p>
                                </ChatbotsCardMobileField>
                            </div>
                            <div className="row">
                                <ChatbotsCardMobileField isFull={ true }>
                                    <label>Descrição</label>
                                    <p>{ bot.description }</p>
                                </ChatbotsCardMobileField>
                            </div>
                        </ChatbotsCardMobile>
                    ))
                }
            </Chatbots>
        }
        </>
    )
}

export default UserBots