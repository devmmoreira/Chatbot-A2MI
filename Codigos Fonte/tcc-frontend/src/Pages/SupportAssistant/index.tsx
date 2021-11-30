import React from 'react'
import { useState } from 'react'

import api from '../../Services/tcc_api'

import AlertInfo from '../../Components/AlertInfo'

import UserData from "../../Models/UserData"

import {
    FormFields,
    RequestData,
    ValidationFormFields,
    AlertMessage
} from './types'

import {
    Support,
    SupportAssistantForm,
    Formfield
} from './style'

const SupportAssistant: React.FC = () => {

    const [userData] = useState<UserData>(JSON.parse(localStorage.getItem("userData") || ""))

    const [showAlertMessage, setShowAlertMessage] = useState<AlertMessage>({
        show: false,
        title: "",
        message: ""
    })

    const [formFields, setFormFields] = useState<FormFields>({
        motive: "",
        phone: "",
        subject: "",
        resume: ""
    })

    const[validationFormFields, setValidationFormFields] = useState<ValidationFormFields>({
        motive: false,
        phone: false,
        subject: false,
        resume: false
    })

    const validateFormData = (data: RequestData): boolean => {
        let info: keyof RequestData

        let isValid: boolean = true
        const validadetedfields: ValidationFormFields = validationFormFields

        for(info in data){
            if(data[info] === ""){
                if(info === "user_id"){
                    isValid = false
                } else{
                    isValid = false
                    validadetedfields[info] = true
                }
            } else{
                if(info !== "user_id"){
                    validadetedfields[info] = false
                }
            }
        }

        setValidationFormFields(validadetedfields)

        return isValid
    }

    const sendSupportEmail = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault()
        setShowAlertMessage(prev => ({ ...prev, show: false}))

        const data: RequestData = {
            user_id: userData?.user?.id || "",
            ...formFields  
        }

        const validatedData = validateFormData(data)

        if(!validatedData){
            setShowAlertMessage({
                show: true,
                title: "Dados Inválidos",
                message: "Preencha todos os campos"
            })

            setTimeout(() => setShowAlertMessage(prev => ({ ...prev, show: false})), 5000)
            return
        }

        try{
            await api.post("/email/send-support", data)

            setShowAlertMessage({
                show: true,
                title: "Email Enviado",
                message: "Seu email foi enviado com sucesso, logo mais entraremos em contato"
            })

            setTimeout(() => setShowAlertMessage(prev => ({ ...prev, show: false})), 5000)
        } catch(err: any){

            console.log(err)

            setShowAlertMessage({
                show: true,
                title: "Falha ao enviar o e-mail",
                message: "Por favor limpe o cache do navegador e faça login novamente"
            })

            setTimeout(() => setShowAlertMessage(prev => ({ ...prev, show: false})), 5000)
        }
    }

    return(
        <Support>
            <SupportAssistantForm>
                <header>
                    <p>Por favor preencha as seguinte informações:</p>
                </header>
                <div className="form-content">
                    <Formfield isError={ validationFormFields.motive }>
                        <label>Motivo do contato:</label>
                        <select onChange={ event => setFormFields(prev => ({ ...prev, motive: event.target.value }))}>
                            <option hidden>Selecione um motivo</option>
                            <option value="payment">Pagamento</option>
                            <option value="support">Suporte Técnico</option>
                            <option value="cancelPlan">Cancelar Plano</option>
                            <option value="upgradePlan">Upgrade de Plano</option>
                            <option value="addPlan">Adicionar Plano</option>
                        </select>
                    </Formfield>
                    <Formfield isError={ validationFormFields.phone }>
                        <label>Telefone: </label>
                        <input 
                            type="text"
                            value={ formFields.phone} 
                            onChange={ event => {
                                if(event.target.value.length <= 25){
                                    setFormFields(prev => ({ ...prev, phone: event.target.value }))
                                }
                            }}
                        />
                    </Formfield>
                    <Formfield isError={ validationFormFields.subject }>
                        <label>Assunto: </label>
                        <input 
                            type="text"
                            value={ formFields.subject} 
                            onChange={ event => {
                                if(event.target.value.length <= 25){
                                    setFormFields(prev => ({ ...prev, subject: event.target.value }))
                                }
                            }}
                        />
                    </Formfield>
                    <Formfield isError={ validationFormFields.resume }>
                        <label>Informe o motivo: </label>
                        <textarea
                            value={ formFields.resume } 
                            onChange={ event => {
                                if(event.target.value.length <= 500){
                                    setFormFields(prev => ({ ...prev, resume: event.target.value }))
                                }
                            }}
                        />
                    </Formfield>
                </div>
                <button onClick={ sendSupportEmail }>Enviar</button>
            </SupportAssistantForm>
            {
                showAlertMessage.show &&
                <AlertInfo 
                    title={ showAlertMessage.title }
                    message={ showAlertMessage.message }
                />
            }
        </Support>
    )
}

export default SupportAssistant