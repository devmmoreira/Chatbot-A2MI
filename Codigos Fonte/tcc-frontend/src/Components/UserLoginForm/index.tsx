import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import tccApi from '../../Services/tcc_api'

import { LoginInputValueVerification, AlertMessage } from './types'

import InfoBalloon from '../InfoBalloon'
import AlertInfo from '../AlertInfo'

import { 
    LoginForm, 
    LoginFormInput, 
    ShowPasswordField 
} from './style'

interface UserLoginProps{
    closeModal: Function,
    togleOption: Function
}

const Userlogin: React.FC<UserLoginProps> = ({ closeModal, togleOption }) => {

    const history = useHistory()
    
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    const [showPassword, setShowPassword]             = useState<boolean>(false)
    const [usernameInputFocus, setUsernameInputFocus] = useState<boolean>(false)
    const [passwordInputFocus, setPasswordInputFocus] = useState<boolean>(false)

    const [hasValue, setHasvalue] = useState<LoginInputValueVerification>({
        username: false,
        password: false
    })

    const [showIfNothasValue, setShowIfNotHasvalue] = useState<LoginInputValueVerification>({
        username: false,
        password: false
    })

    const [valitadionInputError, setValidationInputError] = useState<boolean>(false)

    const [showAlertMessage, setShowAlertMessage] = useState<AlertMessage>({
        show: false,
        title: "Falha de login",
        message: "Não foi possivel realizar o login, tente novamente."
    })

    const handleLogin = async(event: React.FormEvent) => {
        event.preventDefault();

        if(username.current && username.current.value){
            if(password.current && password.current.value){
                try{
                    const response = await tccApi.post("/users/authenticate", {
                        username: username.current.value,
                        password: password.current.value
                    },{
                        timeout: 60000
                    })

                    localStorage.setItem("userData", JSON.stringify(response.data))

                    history.push("/client-area")

                    setValidationInputError(false)

                }catch(err: any){
                    setValidationInputError(true)
                    setShowAlertMessage({
                        show: true,
                        title: "Falha no login",
                        message: err.response.data.message
                    })

                    setTimeout(() => {
                        setShowAlertMessage({
                            show: false,
                            title: "",
                            message: ""
                        })
                    }, 2000)
                }

            } else{
                setShowIfNotHasvalue(prev => ({
                    ...prev,
                    password: true
                }))
    
                setTimeout(() => {
                    setShowIfNotHasvalue(prev => ({
                        ...prev,
                        password: false
                    }))
                }, 2000)
            }
        } else{
            setShowIfNotHasvalue(prev => ({
                ...prev,
                username: true
            }))

            setTimeout(() => {
                setShowIfNotHasvalue(prev => ({
                    ...prev,
                    username: false
                }))
            }, 2000)
        }
    }

    useEffect(() => {
        if(usernameInputFocus){
            setHasvalue({ ...hasValue, username: true })
        } else if(!usernameInputFocus && username.current?.value === ""){
            setHasvalue({ ...hasValue, username: false })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[usernameInputFocus])

    useEffect(() => {
        if(passwordInputFocus){
            setHasvalue({ ...hasValue, password: true })
        } else if(!passwordInputFocus && password.current?.value === ""){
            setHasvalue({ ...hasValue, password: false })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[passwordInputFocus])

    return(
        <LoginForm onSubmit={ handleLogin }>
            <LoginFormInput containsValue={ hasValue.username } isError={ valitadionInputError }>
                <input 
                    className="oi"
                    ref={ username } 
                    type="email" 
                    onFocus={() => setUsernameInputFocus(true)}
                    onBlur={() => setUsernameInputFocus(false)}
                />
                <label>Email</label>
                {
                    (showIfNothasValue.username) && <InfoBalloon message="Digite o usuário"/>
                }
            </LoginFormInput>
            <LoginFormInput containsValue={ hasValue.password } isError={ valitadionInputError }>
                <input 
                    ref={ password }
                    type={(showPassword)? "text" : "password" }
                    onFocus={() => setPasswordInputFocus(true)}
                    onBlur={() => setPasswordInputFocus(false)}
                />
                <label>Senha</label>
                {
                    (showIfNothasValue.password) && <InfoBalloon message="Digite sua senha"/>
                }
            </LoginFormInput>
            <ShowPasswordField>
                <input type="checkbox" onChange={ event => setShowPassword(event.target.checked)}/>
                <p>Mostrar senhas</p>
            </ShowPasswordField>
            <button type="submit">
                Login
            </button>
            <button 
                type="button" 
                onClick={ () => {
                    togleOption({
                        type: 'create',
                        value: true
                    })
                }}
            >
                Cadastrar
            </button>
            {
                showAlertMessage.show &&
                <AlertInfo 
                    title={ showAlertMessage.title } 
                    message={ showAlertMessage.message }
                    isError={ true }
                />
            }
        </LoginForm>
    )
}

export default Userlogin