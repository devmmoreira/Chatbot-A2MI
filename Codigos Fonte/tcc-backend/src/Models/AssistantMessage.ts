export default interface AssistantMessage{
    assistantId: string,
    sessionId: string,
    input: {
        message_type: string,
        text: string
    }
}