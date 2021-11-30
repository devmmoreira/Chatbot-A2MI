import { createTransport } from 'nodemailer'

import { EmailConfig } from '../Config/EmailSenderconfig'

interface RequestDTO{
    user_id: string
    motive: string
    phone: string
    subject: string
    resume: string 
}

export default class SupportEmailSenderService{
    async execute({user_id, motive, phone, subject, resume } : RequestDTO){
        try{
            const emailTansport = createTransport({
                host: EmailConfig.server,
                port: EmailConfig.port,
                secure: false,
                auth: {
                    user: EmailConfig.email,
                    pass: EmailConfig.pass
                },
                tls: {
                    ciphers:'SSLv3'
                }
            })

            await emailTansport.sendMail({
                from: EmailConfig.email,
                to: "marquinhos2725@hotmail.com",
                subject: subject,
                text: `Este é um email de contato com suporte, por favor retorne ao cliente.\n\n
                Id do Client: ${ user_id }\n
                Telefone Contato: ${ phone }\n
                Motivo contato: ${ motive }\n
                Descrição do problema: ${ resume }`
            })
        }catch(err){
            console.log(err)
            throw new Error("Cannot send this e-mail")
        }

    }
}