import React from 'react'
import { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import api from '../../Services/tcc_api'

import NavigationMenuBar from '../../Components/NavigationMenuBar'

import { 
    ContactsPage, 
    InfoContacts, 
    FormContacts, 
    ContactFormPosition 
} from "./style"

import HomePageIAImage from '../../Assets/homepag-IA.jpg'

interface ContactFormData {
    name: string
    userEmail: string
    telphone: string
    message: string
}

const Contacts: React.FC<RouteComponentProps> = ({ match }) => {

    const [messageWritingCountChar, setMessageWritingCountChar] = useState<number>(0)
    
    const [inputFields, setInputFields] = useState<ContactFormData>({
        name: "",
        userEmail: "",
        message: "",
        telphone: ""
    })

    const validateNumberCharMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(event.target.value.length <= 300){
            if(event.target.value === ""){
                setInputFields(prev => ({ ...prev, message: event.target.value }))
                setMessageWritingCountChar(0)
            } else{
                if(inputFields.message.length < event.target.value.length){
                    setMessageWritingCountChar(prev => prev + 1)
                } else if(messageWritingCountChar - 1 > 0){
                    setMessageWritingCountChar(prev => prev - 1)
                }
                setInputFields(prev => ({ ...prev, message: event.target.value }))
            }
        }
    }

    const validateData = (data: ContactFormData) => {
        let isValidated = true
        
        console.log(data)

        let att: keyof typeof data

        for(att in data){
            if(data[att] === "" || data[att] === null || data[att] === undefined){
                isValidated = false
            }
        }

        return isValidated
    }

    const handleSendMessageToUs = async(event: React.FormEvent) => {
        event.preventDefault()

        if(!validateData(inputFields)){
            return alert("Por favor preencha todos os campos, eles são obrigatórios")
        }

        try{
            console.log(inputFields)
            await api.post("/email/send-contact", inputFields)

            alert("E-mail enviado com sucesso. Assim que possível entraremos em contato")
        }catch(error){
            console.log(error)
            alert("Não foi possivel enviar o e-mail, tente novamente mais tarde")
        }
    }

    return(
        <ContactsPage>
            <img className="bg-image" src={ HomePageIAImage } alt="home-page"/>
            <NavigationMenuBar match={ match }/>
            <ContactFormPosition>
                <header>
                    <p>Por favor para entrar em contato conosco preencha <br/>o fomulário ou nos envie um e-mail</p>
                </header>
                <section>
                    <InfoContacts>
                        <p>Email: contato@a2mi.com</p>
                        <p>Segunda à Sexta das 09h às 18h</p>
                        <p>Telefone: (11) 4002-8922</p>
                        <p>Celular: (11) 98765-4321</p>
                    </InfoContacts>
                    <FormContacts textAreaMaxCount={ messageWritingCountChar } onSubmit={ handleSendMessageToUs }>
                        <p className="count-char">{ messageWritingCountChar }/300</p>
                        <div className="infos">
                            <input 
                                type="text" 
                                placeholder="Nome" 
                                onChange={event => setInputFields(prev => ({ ...prev, name: event.target.value })) }
                            />
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                onChange={event => setInputFields(prev => ({ ...prev, userEmail: event.target.value })) }    
                            />
                            <input 
                                type="text" 
                                placeholder="Telefone"
                                value={ inputFields.telphone } 
                                onChange={event => {
                                    if(event.target.value.match("^[0-9]*$")){
                                        setInputFields(prev => ({ ...prev, telphone: event.target.value }))
                                    }
                                }}
                            />
                        </div>
                        <div className="motive">
                            <textarea 
                                value={ inputFields.message } 
                                onChange={ validateNumberCharMessage }
                            />
                        </div>
                        <button type="submit">
                            Enviar
                        </button>
                    </FormContacts>
                </section>
            </ContactFormPosition>
        </ContactsPage>
    )
}

export default Contacts