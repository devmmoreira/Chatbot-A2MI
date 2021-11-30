import { createTransport } from 'nodemailer'

import { EmailConfig } from '../Config/EmailSenderconfig'

interface RequestDTO{
    name: string
    userEmail: string
    telphone: string
    message: string 
}

export default class EmailSenderService{
    async execute({ name, userEmail, telphone, message } : RequestDTO){
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
                to: userEmail,
                subject: "Contato com A2MI",
                text: `Ola me chamo ${ name }!\n\n${ message }.\n\nPara entrar em contato ligue para ${ telphone } ou envie um e-mail para ${ userEmail }`
            })
        }catch(err){
            console.log(err)
            throw new Error("Cannot send this e-mail")
        }

    }
}