import React from 'react'
import { useEffect } from 'react'

import { AlertInfoCard } from './style'

interface AlertInfoProps{
    title: string
    message: string
    isError?: boolean
}

const AlertInfo: React.FC<AlertInfoProps> = ({ title, message, isError }) => {
    useEffect(() => console.log({ title, message, isError }), [title, message, isError])
    return (
        <AlertInfoCard isError={ isError }>
            <h1>{ title }</h1>
            <p>{ message }</p>
        </AlertInfoCard>
    )
}

export default AlertInfo