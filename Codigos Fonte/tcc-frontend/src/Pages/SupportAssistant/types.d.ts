export interface FormFields{
    motive: string
    phone: string
    subject: string
    resume: string
}

export interface ValidationFormFields{
    motive: boolean
    phone: boolean
    subject: boolean
    resume: boolean
}

export interface RequestData{
    user_id: string
    motive: string
    phone: string
    subject: string
    resume: string
}

export interface AlertMessage{
    show: boolean
    message: string,
    title: string
}