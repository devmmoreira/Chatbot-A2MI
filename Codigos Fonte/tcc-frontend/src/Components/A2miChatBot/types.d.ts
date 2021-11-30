export interface ChatbotConnection {
    sessionId: string
    status: Number
    statusText: string
}

export interface HistoryChatTextModel{
    messagetype: "text" | "option"
    origin: "user" | "bot"
    from: string,
    text: string | undefined
    options?: Array<{
        label: string,
        value: {
            input: {
                text: string
            }
        }
    }>
}