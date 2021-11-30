import React from "react"
import { useState, useRef, useEffect } from "react"
import { useHistory, Link, RouteComponentProps } from "react-router-dom"

import UserData from "../../Models/UserData"

import {
    FormFields,
    FormFieldsEditing,
    AlertMessage
} from './types'

import api from '../../Services/tcc_api'

import AlertInfo from "../../Components/AlertInfo"

import UserRouters from '../../Routes/client.routes'
import A2miLogo from '../../Assets/logotipo-branco.png'

import {
    Popper,
    Fade,
    ClickAwayListener,
    Drawer,
    Modal,
    Backdrop
} from '@material-ui/core'

import {
    Person,
    HighlightOffRounded,
    DehazeRounded,
    EditOutlined,
    CloseSharp,
    Visibility,
    VisibilityOff
} from '@material-ui/icons'

import {
    ClientAreaPage,
    ClientHeader,
    MenuUserOptions,
    ClientAreaSection,
    MobileMenu,
    EditUserModal,
    EditUserModalField
} from './style'

export interface ValidationInputPassord {
    originalPassword: string,
    repeatPassword: string
}

const ClientArea: React.FC<RouteComponentProps> = ({ location }) => {

    const history = useHistory()

    const menuUserOptions = useRef<HTMLButtonElement>(null)

    const [userData] = useState<UserData>(JSON.parse(localStorage.getItem("userData") || ""))

    const [editUserInfoModal, setEditUserInfo]              = useState<boolean>(false)
    const [showUpdateButton, setShowUpdateButton]           = useState<boolean>(false)
    const [openMenuUserOptions, setOpenMenuUserOptions]     = useState<boolean>(false)
    const [openMobileMenuOptions, setOpenMobileMenuOptions] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<ValidationInputPassord>({
        originalPassword: "password",
        repeatPassword: "password"
    })

    const [alertMessage, setAlertMessage] = useState<AlertMessage>({
        show: false,
        title: "",
        message: ""
    })
    
    const [previousEditValue, setPreviousEditValue] = useState<FormFields>({
        username: "",
        email: "",
        fullname: "",
        password: {
            newPass: "",
            confirmPass: ""
        },
        phone: ""
    })

    const [formFields, setFormFields] = useState<FormFields>({
        username: "",
        email: "",
        fullname: "",
        password: {
            newPass: "",
            confirmPass: ""
        },
        phone: ""
    })

    const [formFieldsEditing, setFormFieldsEditing] = useState<FormFieldsEditing>({
        username: false,
        fullname: false,
        email: false,
        password: false,
        phone: false
    })

    /**
     * 
     * @param event 
     * 
     * Remove o token de autenticação e redireciona para a página principal
     */

    const logOut = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        localStorage.clear()
        history.push("/")
    }

    const togleEdit = async(value: keyof FormFieldsEditing) => {
        let isReadyToUpdate: boolean = false

        const fieldIsReadyToUpdate: FormFieldsEditing = {
            ...formFieldsEditing,
            [value]: !formFieldsEditing[value]
        }

        for(value in fieldIsReadyToUpdate){
            if(fieldIsReadyToUpdate[value] === true){
                isReadyToUpdate = true
            }
        }
        setShowUpdateButton(isReadyToUpdate)
        setFormFieldsEditing(fieldIsReadyToUpdate)
    }

    const openEditInfoOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setOpenMenuUserOptions(false)
        setEditUserInfo(true)
    }

    const closeEditInfoOptions = (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<Document, MouseEvent>) => {
        event.preventDefault()
        setEditUserInfo(false)
        setFormFields(previousEditValue)
        setShowUpdateButton(false)
        setFormFieldsEditing({
            username: false,
            fullname: false,
            email: false,
            password: false,
            phone: false
        })
    }

    const updateUserInfo = async(event: React.FormEvent): Promise<void> => {
        event.preventDefault()

        if(formFieldsEditing.password){
            if(formFields.password.newPass !== formFields.password.confirmPass){
                setAlertMessage({
                    show: true,
                    title: "Senhas não batem",
                    message: "Por favor digite as senhas iguais"
                })
    
                setTimeout(() => {
                    setAlertMessage({
                        show: false,
                        title: "",
                        message: ""
                    })
                }, 2500)

                return
            }
        }

        const data = {
            id: userData.user?.id,
            username: (previousEditValue.username === formFields.username)? "" : formFields.username,
            fullname: (previousEditValue.fullname === formFields.fullname)? "" : formFields.fullname,
            password: formFields.password.confirmPass,
            email: (previousEditValue.email === formFields.email)? "" : formFields.email,
            phone: (previousEditValue.phone === formFields.phone)? "" : formFields.phone
        }

        try{
            const updatedUserData = await api.put("/users/update", data, {
                headers: {
                    Authorization: userData.token
                }
            })

            setAlertMessage({
                show: true,
                title: "Dados Atualizados",
                message: "Os dados foram editados com sucesso"
            })

            setPreviousEditValue({
                username: updatedUserData.data.username,
                email: updatedUserData.data.email,
                fullname: updatedUserData.data.fullname,
                password: {
                    newPass: "",
                    confirmPass: ""
                },
                phone: updatedUserData.data.phone,
            })

            setFormFields({
                username: updatedUserData.data.username,
                email: updatedUserData.data.email,
                fullname: updatedUserData.data.fullname,
                password: {
                    newPass: "",
                    confirmPass: ""
                },
                phone: updatedUserData.data.phone,
            })

            setShowUpdateButton(false)
            setEditUserInfo(false)
            setFormFieldsEditing({
                username: false,
                fullname: false,
                email: false,
                password: false,
                phone: false
            })

            setTimeout(() => {
                setAlertMessage({
                    show: false,
                    title: "",
                    message: ""
                })
            }, 2500)

        } catch(err: any){
            console.log(err.response)
            setAlertMessage({
                show: true,
                title: "Falha as atualizar os dados",
                message: err.response.data.message
            })

            setTimeout(() => {
                setAlertMessage({
                    show: false,
                    title: "",
                    message: ""
                })
            }, 2500)
        }
    } 

    useEffect(() => {
        if(userData){
            api.get(`/users/get-user/${userData.user?.id}`,{
                headers: {
                    Authorization: userData.token
                }
            }).then(response => {
                setFormFields(prev => ({
                    ...prev,
                    fullname: response.data.fullname,
                    username: response.data.username,
                    cpf_cnpj: response.data.cpf_cnpj,
                    email: response.data.email,
                    phone: response.data.phone
                }))

                setPreviousEditValue(prev => ({
                    ...prev,
                    username: response.data.username,
                    fullname: response.data.fullname,
                    cpf_cnpj: response.data.cpf_cnpj,
                    email: response.data.email,
                    phone: response.data.phone
                }))
            })
            .catch(error => {
                console.log(error)
                setAlertMessage({
                    show: true,
                    title: "Falha ao carregar dados de Usuário",
                    message: "Por favor limpe o cache e realize login novamente"
                })
    
                setTimeout(() => {
                    setAlertMessage({
                        show: false,
                        title: "",
                        message: ""
                    })
                }, 2500)
            })
        } else{
            setAlertMessage({
                show: true,
                title: "Dados de login inálido",
                message: "Por favor limpe o cache e realize login novamente"
            })

            setTimeout(() => {
                setAlertMessage({
                    show: false,
                    title: "",
                    message: ""
                })
            }, 2500)
        }
    },[userData])

    return(
        <ClientAreaPage>
            <ClientHeader menuUserSelected={ openMenuUserOptions }>
                <header>
                    <button className="mobile-menu" onClick={ () => setOpenMobileMenuOptions(true)}>
                        <DehazeRounded />
                    </button>
                    <Drawer 
                        anchor="left"
                        open={ openMobileMenuOptions } 
                        onClose={ () => {
                            setOpenMobileMenuOptions(false)
                            clearInterval()
                        }}
                    >
                        <MobileMenu>
                            <button onClick={ () => setOpenMobileMenuOptions(false)}>
                                <HighlightOffRounded/>
                            </button>
                            <Link
                                to="/client-area/user-plans"
                                className={ location.pathname === "/client-area/user-plans" ? "selected" : "" }
                                onClick={ () => setOpenMobileMenuOptions(false) }
                            >
                                Planos Assinados
                            </Link>
                            <Link
                                to="/client-area/payments"
                                className={ location.pathname === "/client-area/payments" ? "selected" : "" }
                                onClick={ () => setOpenMobileMenuOptions(false) }
                            >
                                Faturas
                            </Link>
                            <Link
                                to="/client-area/user-bots"
                                className={ location.pathname === "/client-area/user-bots" ? "selected" : "" }
                                onClick={ () => setOpenMobileMenuOptions(false) }
                            >
                                ChatBots
                            </Link>
                            <Link
                                to="/client-area/support"
                                className={ location.pathname === "/client-area/support" ? "selected" : "" }
                                onClick={ () => setOpenMobileMenuOptions(false) }
                            >
                                Suporte
                            </Link>
                        </MobileMenu>
                    </Drawer>
                    <img src={ A2miLogo } alt="A2mi" onClick={ () => history.push("/client-area") }/>
                    <div className="user-welcome">
                        <p>Olá <br/> usuário</p>
                        <button
                            ref={ menuUserOptions }
                            onClick={() => setOpenMenuUserOptions(prev => !prev)}
                        >
                            <Person />
                        </button>
                        <Popper open={ openMenuUserOptions } anchorEl={ menuUserOptions.current } placement="bottom-end" transition>
                            {({ TransitionProps }) => (
                                <ClickAwayListener onClickAway={ () => setOpenMenuUserOptions(false) }>
                                <Fade {...TransitionProps} timeout={250}>
                                    <MenuUserOptions>
                                        <button 
                                            onClick={ openEditInfoOptions }
                                        >
                                            Editar Informações
                                        </button>
                                        <button onClick={ logOut }>Sair</button>
                                    </MenuUserOptions>
                                </Fade>
                                </ClickAwayListener>
                            )}
                        </Popper>
                        <Modal
                            open={ editUserInfoModal }
                            onClose={ closeEditInfoOptions }
                            BackdropComponent={ Backdrop }
                            closeAfterTransition
                        >
                            <Fade in={ editUserInfoModal }>
                                <EditUserModal>
                                    <div className="modal-content">
                                        <button className="close" onClick={ closeEditInfoOptions }>
                                            <HighlightOffRounded/>
                                        </button>
                                        <form onSubmit={ updateUserInfo }>
                                            <EditUserModalField isFull={ true }>
                                                <label>
                                                    Nome Completo
                                                    {
                                                        formFieldsEditing.fullname ?
                                                        <CloseSharp className="inside-input" onClick={ () => togleEdit("fullname") } />
                                                        :
                                                        <EditOutlined className="inside-input" onClick={ () => togleEdit("fullname") }/>
                                                    } 
                                                </label>
                                                {
                                                    formFieldsEditing.fullname ?
                                                    <input 
                                                        type="text" 
                                                        value={ formFields.fullname }
                                                        onChange={ event => setFormFields(prev => ({
                                                            ...prev,
                                                            fullname: event.target.value
                                                        }))}
                                                    />
                                                    :
                                                    <p>{ formFields.fullname }</p>
                                                }
                                            </EditUserModalField>
                                            <EditUserModalField isFull={ true }>
                                                <label>
                                                    Usuário
                                                    {
                                                        formFieldsEditing.username ?
                                                        <CloseSharp className="inside-input" onClick={ () => togleEdit("username") } />
                                                        :
                                                        <EditOutlined className="inside-input" onClick={ () => togleEdit("username") }/>
                                                    } 
                                                </label>
                                                {
                                                    formFieldsEditing.username ?
                                                    <input 
                                                        type="text" 
                                                        value={ formFields.username }
                                                        onChange={ event => setFormFields(prev => ({
                                                            ...prev,
                                                            username: event.target.value
                                                        }))}
                                                    />
                                                    :
                                                    <p>{ formFields.username }</p>
                                                }
                                            </EditUserModalField>
                                            <EditUserModalField isFull={ true }>
                                                <label>
                                                    Email
                                                    {
                                                        formFieldsEditing.email ?
                                                        <CloseSharp className="inside-input" onClick={ () => togleEdit("email") } />
                                                        :
                                                        <EditOutlined className="inside-input" onClick={ () => togleEdit("email") }/>
                                                    } 
                                                </label>
                                                {
                                                    formFieldsEditing.email ?
                                                    <input 
                                                        type="text" 
                                                        value={ formFields.email }
                                                        onChange={ event => setFormFields(prev => ({
                                                            ...prev,
                                                            email: event.target.value
                                                        }))}
                                                    />
                                                    :
                                                    <p>{ formFields.email }</p>
                                                }
                                            </EditUserModalField>
                                            <EditUserModalField isFull={ true }>
                                                <label>
                                                    Telefone
                                                    {
                                                        formFieldsEditing.phone ?
                                                        <CloseSharp className="inside-input" onClick={ () => togleEdit("phone") } />
                                                        :
                                                        <EditOutlined className="inside-input" onClick={ () => togleEdit("phone") }/>
                                                    } 
                                                </label>
                                                {
                                                    formFieldsEditing.phone ?
                                                    <input 
                                                        type="text" 
                                                        value={ formFields.phone }
                                                        onChange={ event => setFormFields(prev => ({
                                                            ...prev,
                                                            phone: event.target.value
                                                        }))}
                                                    />
                                                    :
                                                    <p>{ formFields.phone }</p>
                                                }
                                            </EditUserModalField>
                                            <EditUserModalField isFull={ formFieldsEditing.password ? false : true }>
                                                {
                                                    formFieldsEditing.password ?
                                                    <>
                                                    <label>
                                                        Senha
                                                        {
                                                            formFieldsEditing.password &&
                                                            <CloseSharp onClick={ () => togleEdit("password") } />
                                                        } 
                                                    </label>
                                                    <input 
                                                        type={ showPassword.originalPassword } 
                                                        value={ formFields.password.newPass }
                                                        onChange={ event => setFormFields(prev => ({
                                                            ...prev,
                                                            password:{
                                                                ...prev.password,
                                                                newPass: event.target.value
                                                            }
                                                        }))}
                                                    />
                                                    {
                                                        (showPassword.originalPassword === "password")&&
                                                        <Visibility className="inside-input" onClick={() => setShowPassword(prev => ({ ...prev, originalPassword: "text" }))}/>                    
                                                    }
                                                    {
                                                        (showPassword.originalPassword === "text")&&
                                                        <VisibilityOff className="inside-input" onClick={() => setShowPassword(prev => ({ ...prev, originalPassword: "password" }))}/> 
                                                    }
                                                    </>
                                                    :
                                                    <button onClick={ () => togleEdit("password") }>Alterar Senha</button>
                                                }
                                            </EditUserModalField>
                                            {
                                                formFieldsEditing.password &&
                                                <EditUserModalField isFull={ false }>
                                                    <label>Confirmar Senha</label>
                                                    <input 
                                                        type={ showPassword.repeatPassword } 
                                                        value={ formFields.password.confirmPass }
                                                        onChange={ event => setFormFields(prev => ({
                                                            ...prev,
                                                            password:{
                                                                ...prev.password,
                                                                confirmPass: event.target.value
                                                            }
                                                        }))}
                                                    />
                                                    {
                                                        (showPassword.repeatPassword === "password")&&
                                                        <Visibility className="inside-input" onClick={() => setShowPassword(prev => ({ ...prev, repeatPassword: "text" }))}/>                    
                                                    }
                                                    {
                                                        (showPassword.repeatPassword === "text")&&
                                                        <VisibilityOff className="inside-input" onClick={() => setShowPassword(prev => ({ ...prev, repeatPassword: "password" }))}/> 
                                                    }
                                                </EditUserModalField>
                                            }
                                            {
                                                showUpdateButton &&
                                                <button type="submit">Atualizar</button>
                                            }
                                        </form>
                                    </div>
                                </EditUserModal>
                            </Fade>
                        </Modal>
                    </div>
                </header>
            </ClientHeader>
            <ClientAreaSection>
                <nav>
                    <Link
                        to="/client-area/user-plans"
                        className={ location.pathname === "/client-area/user-plans" ? "selected" : "" }
                    >
                        Planos Assinados
                    </Link>
                    <Link
                        to="/client-area/payments"
                        className={ location.pathname === "/client-area/payments" ? "selected" : "" }
                    >
                        Faturas
                    </Link>
                    <Link
                        to="/client-area/user-bots"
                        className={ location.pathname === "/client-area/user-bots" ? "selected" : "" }
                    >
                        ChatBots
                    </Link>
                    <Link
                        to="/client-area/support"
                        className={ location.pathname === "/client-area/support" ? "selected" : "" }
                    >
                        Suporte
                    </Link>
                </nav>
                <section>
                    {
                        location.pathname === "/client-area" &&
                        <div className="home-info">
                            <img src={ A2miLogo } alt="A2mi"/>
                        </div>
                    }
                    <UserRouters />
                </section>
            </ClientAreaSection>
            {
                alertMessage.show && 
                <AlertInfo 
                    title={ alertMessage.title }
                    message={ alertMessage.message }
                    isError={ alertMessage.isError }
                />
            }
        </ClientAreaPage>
    )
}

export default ClientArea