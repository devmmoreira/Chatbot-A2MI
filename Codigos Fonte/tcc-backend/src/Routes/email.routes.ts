import { Router, Request, Response } from 'express'

import EmailSenderService from '../Services/EmailSenderService'
import SupportEmailSenderService from '../Services/SupportEmailSenderService'

const EmailRouter = Router()

EmailRouter.post("/send-contact", async (request: Request, response: Response) => {
    const { name, userEmail, telphone, message } = request.body

    try {
        const emailSender = new EmailSenderService()

        await emailSender.execute({ name, userEmail, telphone, message })

        return response.status(204).json()
    } catch (error: any) {
        return response.status(400).json({
            err: "Invalid email",
            message: error.message
        })
    }
})

EmailRouter.post("/send-support", async (request: Request, response: Response) => {

    try {
        const emailSender = new SupportEmailSenderService()

        await emailSender.execute(request.body)

        return response.status(204).json()
    } catch (error: any) {
        return response.status(400).json({
            err: "Invalid email",
            message: error.message
        })
    }
})

export default EmailRouter