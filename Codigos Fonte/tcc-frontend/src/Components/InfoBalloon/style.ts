import styled from "styled-components"
import { fadeAnimation } from "../../Themes/animations"

export const InfoBalloon = styled.div`
    animation-name: ${ fadeAnimation };
    animation-duration: 200ms;
`

export const InfoBalloonContent = styled.div`
    background-color: #FFFFFF;
    width: auto;
    min-width: 90px;
    padding: 10px;
    border-radius: 0px 5px 5px 5px;
    margin-left: 10px;
    position: absolute;
    z-index: 1;

    p{
        margin: 0px;
        color: black;
        font-family: sans-serif;
        font-size: 1.2rem;
    }
`

export const InfoBalloonArrowIndicator = styled.div`
    width: 0px;
    height: 0px;
    margin-top: -15px;
    margin-left: 10px;
    border-left: 15px solid #FFFFFF;
    border-top: 15px solid #FFFFFF00;
    position: absolute;
    z-index: 3;
`