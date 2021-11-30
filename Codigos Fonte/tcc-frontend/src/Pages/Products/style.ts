import styled from "styled-components"

import { fadeAnimation } from '../../Themes/animations'

export const ProductsPage = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #1d012a;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

    img.bg-image{
        position: fixed;
        width: 80%; 
        height: 110vh;
        opacity: 0.8;
        margin: 0 auto;
        margin-left: -3px;

        @media(max-width: 800px){
            width: 800px; 
            height: 910px;
        }

        @media(min-width: 800px) and (max-width: 1024px){
            width: 900px; 
            height: 1200px;
        }

        @media(max-height: 600px) and (min-width: 800px){
            width: 80%; 
            height: 910px;
        }
    }

    .chat-with-bot{
        position: fixed;
        bottom: 0;
        right: 0;
        margin-right: 20px;
        margin-bottom: 30px;
    }
`

export const ShowProducts = styled.div`
    width: 100%;
    max-width: 1600px;
    height: auto;
    min-height: 75vh;
    z-index: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    animation-name: ${ fadeAnimation };
    animation-duration: 120ms;
`

export const CloseChatbotButton = styled.button`
    position: fixed;
    width: 30px;
    height: 30px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 3px 0px 0px 3px;
    margin-left: -30px;
` 