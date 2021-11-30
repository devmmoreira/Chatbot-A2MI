export interface FormFields{
    username: string
    password: {
        newPass: string
        confirmPass: string
    }
    fullname: string
    email: string
    phone: string
}

export interface FormFieldsEditing{
    username: boolean
    fullname: boolean
    password: boolean
    email: boolean
    phone: boolean
}

export interface AlertMessage{
    show: boolean
    title: string
    message: string
    isError?: boolean
}
