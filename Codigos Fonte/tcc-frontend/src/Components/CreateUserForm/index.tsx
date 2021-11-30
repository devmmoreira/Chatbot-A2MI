import React from 'react'
import { useState, useRef } from 'react'

import tcc_api from '../../Services/tcc_api'

import {
    newUser,
    InputCreateUserForm,
    InputTypeValidadion,
    ValidationInputPassord,
    AlertMessage
} from './types'

import AlertInfo from '../AlertInfo'
import { Visibility, VisibilityOff } from '@material-ui/icons'

import {
    CreateUserForm,
    InputCreateUser,
} from './style'

export interface CreateUserProps{
    togleOption: Function
}

const CreateUser: React.FC<CreateUserProps> = ({ togleOption }) => {

    const dateOfBirthy = useRef<HTMLInputElement>(null)

    const [username, setUsername] = useState<string>("")
    const [fullname, setFullname] = useState<string>("")
    const [email, setEmail]       = useState<string>("")
    const [phone, setPhone]       = useState<string>("")
    const [CPF, setCPF]           = useState<string>("")
    const [password, setPassword] = useState<ValidationInputPassord>({
        originalPassword: "",
        repeatPassword: ""
    })

    const [showPassword, setShowPassword] = useState<ValidationInputPassord>({
        originalPassword: "password",
        repeatPassword: "password"
    })

    const [alertMessage, setAlertMessage] = useState<AlertMessage>({
        show: false,
        title: "",
        message: ""
    })

    const [hasValue, setHasvalue] = useState<InputCreateUserForm>({
        username: false,
        fullname: false,
        email: false,
        password: false,
        repeatPass: false,
        date_of_birthy: false,
        phone: false,
        cpf_cnpj: false
    })

    const [valitadionInputError, setValidationInputError] = useState<InputTypeValidadion>({
        username: false,
        fullname: false,
        email: false,
        password: false,
        date_of_birthy: false,
        phone: false,
        cpf_cnpj: false
    })

    const createNewUser = async (event: React.FormEvent) => {
        event.preventDefault()

        const newUser: newUser = {
            username,
            fullname,
            email,
            password: password.originalPassword,
            phone,
            cpf_cnpj: CPF,
            date_of_birthy: dateOfBirthy.current?.value || ""
        }

        let value: keyof typeof newUser
        let validation: InputTypeValidadion = valitadionInputError
        let haveEmptyItem: boolean = false

        for(value in newUser){
            if(newUser[value] === ""){
                haveEmptyItem = true
                validation = {
                    ...validation,
                    [`${value}`]: true
                }
            } else{
                validation = {
                    ...validation,
                    [`${value}`]: false
                }
            }
        }

        setValidationInputError(validation)
        if(haveEmptyItem){
            setAlertMessage({
                show: true,
                title: "Dados Inválidos",
                message: "Por favor preencha todos os campos, eles são obrigatórios"
            })

            setTimeout(() => {
                setAlertMessage({
                    show: false,
                    title: "",
                    message: ""
                })
            }, 5000)
            return
        }

        if(password.originalPassword !== password.repeatPassword){
            setValidationInputError(prev => ({
                ...prev,
                password: true
            }))
            
            setAlertMessage({
                show: true,
                title: "Senha inválida",
                message: "Sennhas não são iguais, tente novamente"
            })

            setTimeout(() => {
                setAlertMessage({
                    show: false,
                    title: "",
                    message: ""
                })
            }, 5000)

            return
        }

        try{
            const response = await tcc_api.post("/users/create", newUser)

            setAlertMessage({
                show: true,
                title: "Sucesso",
                message: response.data.message
            })

            setTimeout(() => {
                setAlertMessage({
                    show: false,
                    title: "",
                    message: ""
                })

                togleOption({
                    type: 'login',
                    value: true
                })
            }, 2000)
        }catch(err: any){

            const message: string = err.response.data.message || ""

            if(message.includes("cpf") || message.includes("cnpj")){
                setValidationInputError(prev => ({
                    ...prev,
                    cpf_cnpj: true
                }))
            }

            setAlertMessage({
                show: true,
                title: "Dados Inválidos",
                message: message
            })

            setTimeout(() => {
                setAlertMessage({
                    show: false,
                    title: "",
                    message: ""
                })
            }, 5000)
        }
    }

    return(
        <>
        <CreateUserForm onSubmit={ createNewUser }>
            <section>
                <div className="col-1">
                    <InputCreateUser
                        hasValue={ hasValue.username } 
                        isError={ valitadionInputError.username }
                    >
                        <label>Usuário</label>
                        <input 
                            type="text" 
                            name="Username"
                            value={ username }
                            onFocus={ () =>  setHasvalue(prev => ({ ...prev, username: true})) } 
                            onBlur={ event => {
                                if(event.target.value === ""){
                                    setHasvalue(prev => ({ ...prev, username: false }))
                                }
                            }}
                            onChange={ event => setUsername(event.target.value) } 
                        />                    
                    </InputCreateUser>
                    <InputCreateUser 
                        hasValue={ hasValue.email } 
                        isError={ valitadionInputError.email }
                    >
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="Email"
                            value={ email }
                            onFocus={ () =>  setHasvalue(prev => ({ ...prev, email: true})) } 
                            onBlur={ event => {
                                if(event.target.value === ""){
                                    setHasvalue(prev => ({ ...prev, email: false }))
                                }
                            }} 
                            onChange={ event => setEmail(event.target.value) }
                        />                    
                    </InputCreateUser>
                    <InputCreateUser 
                        hasValue={ hasValue.date_of_birthy } 
                        isError={ valitadionInputError.date_of_birthy }
                    >
                        <label>Data de Nascimento</label>
                        <input 
                            ref={ dateOfBirthy } 
                            type="date"
                            onFocus={ () =>  setHasvalue(prev => ({ ...prev, date_of_birthy: true})) } 
                            onBlur={ event => {
                                if(event.target.value === ""){
                                    setHasvalue(prev => ({ ...prev, date_of_birthy: false }))
                                }
                            }}
                        />                    
                    </InputCreateUser>
                    <InputCreateUser 
                        hasValue={ hasValue.cpf_cnpj } 
                        isError={ valitadionInputError.cpf_cnpj }
                    >
                        <label>CPF/CNPJ</label>
                        <input 
                            type="text" 
                            value={ CPF }
                            onFocus={ () =>  setHasvalue(prev => ({ ...prev, cpf_cnpj: true})) } 
                            onBlur={ event => {
                                if(event.target.value === ""){
                                    setHasvalue(prev => ({ ...prev, cpf_cnpj: false }))
                                }
                            }}
                            onChange={ event => {
                                if(event.target.value.match("^[0-9]*$")){
                                    setCPF(event.target.value)
                                }
                            }
                        }/>                    
                    </InputCreateUser>
                </div>
                <div className="col-2">
                    <InputCreateUser 
                        hasValue={ hasValue.fullname } 
                        isError={ valitadionInputError.fullname }
                    >
                        <label>Nome Completo</label>
                        <input 
                            type="text" 
                            name="FullName" 
                            value={ fullname }
                            onFocus={ () =>  setHasvalue(prev => ({ ...prev, fullname: true})) } 
                            onBlur={ event => {
                                if(event.target.value === ""){
                                    setHasvalue(prev => ({ ...prev, fullname: false }))
                                }
                            }}
                            onChange={ event => setFullname(event.target.value) }
                        />                    
                    </InputCreateUser>
                    <InputCreateUser 
                        hasValue={ hasValue.password } 
                        isError={ valitadionInputError.password }
                    >
                        <label>Senha</label>
                        <input 
                            type={ showPassword.originalPassword }
                            value={ password.originalPassword }
                            onFocus={ () =>  setHasvalue(prev => ({ ...prev, password: true})) } 
                            onBlur={ event => {
                                if(event.target.value === ""){
                                    setHasvalue(prev => ({ ...prev, password: false }))
                                }
                            }} 
                            onChange={ event => setPassword(prev => ({
                                ...prev,
                                originalPassword: event.target.value
                            }))}
                        />
                        {
                            (showPassword.originalPassword === "password")&&
                            <Visibility onClick={() => setShowPassword(prev => ({ ...prev, originalPassword: "text" }))}/>                    
                        }
                        {
                            (showPassword.originalPassword === "text")&&
                            <VisibilityOff onClick={() => setShowPassword(prev => ({ ...prev, originalPassword: "password" }))}/> 
                        }
                    </InputCreateUser>
                    <InputCreateUser 
                        hasValue={ hasValue.repeatPass } 
                        isError={ valitadionInputError.password }
                    >
                        <label>Confirmar Senha</label>
                        <input 
                            type={ showPassword.repeatPassword } 
                            value={ password.repeatPassword }
                            onFocus={ () =>  setHasvalue(prev => ({ ...prev, repeatPass: true})) } 
                            onBlur={ event => {
                                if(event.target.value === ""){
                                    setHasvalue(prev => ({ ...prev, repeatPass: false }))
                                }
                            }} 
                            onChange={ event => setPassword(prev => ({
                                ...prev,
                                repeatPassword: event.target.value
                            }))}
                        />
                        {
                            (showPassword.repeatPassword === "password")&&
                            <Visibility onClick={() => setShowPassword(prev => ({ ...prev, repeatPassword: "text" }))}/>                    
                        }
                        {
                            (showPassword.repeatPassword === "text")&&
                            <VisibilityOff onClick={() => setShowPassword(prev => ({ ...prev, repeatPassword: "password" }))}/> 
                        }                    
                    </InputCreateUser>
                    <InputCreateUser 
                        hasValue={ hasValue.phone } 
                        isError={ valitadionInputError.phone }
                    >
                        <label>Telefone</label>
                        <input 
                            type="text"
                            value={ phone }
                            onFocus={ () =>  setHasvalue(prev => ({ ...prev, phone: true})) } 
                            onBlur={ event => {
                                if(event.target.value === ""){
                                    setHasvalue(prev => ({ ...prev, phone: false }))
                                }
                            }}  
                            onChange={ event => {
                                if(event.target.value.match("^[0-9]*$")){
                                    setPhone(event.target.value)
                                }
                            }}
                        />                    
                    </InputCreateUser>
                </div>
            </section>
            <footer>
                <button 
                    type="button" 
                    onClick={ () => {
                        setAlertMessage({
                            show: false,
                            title: "",
                            message: ""
                        })

                        setTimeout(() => {
                            togleOption({
                                type: 'login',
                                value: true
                            })
                        }, 250)
                    }}
                >
                    Voltar
                </button>
                <button type="submit">Registrar</button>
            </footer>
        </CreateUserForm>
        {
            alertMessage.show && 
            <AlertInfo 
                title={ alertMessage.title }
                message={ alertMessage.message }
                isError={ alertMessage.isError }
            />
        }
        </>
    )
}

export default CreateUser