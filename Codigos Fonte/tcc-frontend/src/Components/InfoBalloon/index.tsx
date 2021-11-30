import React from "react"

import { InfoBalloon, InfoBalloonContent, InfoBalloonArrowIndicator } from './style'

interface InfoBalloonProps {
    //style?: React.CSSProperties
    children?: React.ReactChildren
    ballonColor?: string
    messageColor?: string
    message: string
}

const InfoBalloonComponent: React.FC<InfoBalloonProps> = ({ message, children, ballonColor, messageColor }) => {
    return(
        <InfoBalloon>
            <InfoBalloonArrowIndicator style={{ borderLeftColor: (ballonColor)? ballonColor : '#FFFFFF' }} />
            <InfoBalloonContent style={{ 
                backgroundColor: (ballonColor)? ballonColor : '#FFFFFF',
                color: (messageColor)? messageColor : 'black' 
            }}>
                <p>{ message }</p>
                { children }
            </InfoBalloonContent>
        </InfoBalloon>
    )
}

export default InfoBalloonComponent