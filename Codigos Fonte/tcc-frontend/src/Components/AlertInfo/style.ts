import styled from "styled-components"
import { css } from "styled-components"

import { fadeAnimation } from '../../Themes/animations'

interface AlertInfoCardProps{
    isError?: boolean
}

export const AlertInfoCard = styled.div<AlertInfoCardProps>`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 450px;
    height: 100px;
    margin-bottom: 25px;
    margin-right: 25px;
    padding: 15px;
    border-radius: 15px;
    background-color: #b3baf2;
    color: #000000;
    border: 5px inset #074c91;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation-name: ${ fadeAnimation };
    animation-duration: 150ms;

    h1{
        margin: 0px;
        margin-bottom: 5px;
        font-family: sans-serif;
        font-size: 1.8rem;
    }

    p{
        margin: 0px;
        font-family: sans-serif;
        font-size: 1.4rem;
    }

    ${props => props.isError && css`
        background-color: #e89090;
        color: #000000;
        border-color: red;
    `}

    @media(max-width: 800px){
        width: 75%;
        min-width: 250px;
        height: 100px
    }

    @media(max-width: 500px){
        width: 80%;
        min-width: 250px;
        height: 100px
    }
`