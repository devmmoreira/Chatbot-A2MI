
export interface newUser{
    username: string
    fullname: string
    email: string
    password: string
    phone: string
    cpf_cnpj: string,
    date_of_birthy: string
}

export interface InputCreateUserForm {
    username: boolean,
    fullname: boolean,
    email: boolean,
    password: boolean,
    repeatPass: boolean,
    date_of_birthy: boolean,
    phone: boolean,
    cpf_cnpj: boolean
}

export interface InputTypeValidadion {
    username: boolean,
    fullname: boolean,
    email: boolean,
    password: boolean,
    date_of_birthy: boolean,
    phone: boolean,
    cpf_cnpj: boolean
}

export interface ValidationInputPassord {
    originalPassword: string,
    repeatPassword: string
}

export interface AlertMessage{
    show: boolean
    title: string
    message: string
    isError?: boolean
}