import styled from 'styled-components'
import { css } from 'styled-components'
import { bounceAnimation, fadeAnimation } from '../../Themes/animations'

import HomePageIAImage from '../../Assets/homepag-IA.jpg'

interface CardHomePageProps{
    gridArea: string
    backgroundImage: string
    backgroundColor: string
    selected?: boolean
}

export const HomePageComponent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-image: url(${ HomePageIAImage });
    background-repeat: no-repeat;
    background-size: 80% 110vh;
    background-position: top center;

    .chat-with-bot{
        position: fixed;
        bottom: 0;
        right: 0;
        margin-right: 20px;
        margin-bottom: 30px;
    }

    @media(max-width: 800px){
        background-size: 800px 910px;
    }

    @media(min-width: 800px) and (max-width: 1024px){
        background-size: 900px 1200px;
    }

    @media(max-height: 600px) and (min-width: 800px){
        background-size: 80% 910px;
    }
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

    &:hover{
        cursor: pointer;
    }
` 

export const Intro = styled.div`
    width: 100%;
    max-width: 1600px;
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    animation-name: ${ fadeAnimation };
    animation-duration: 500ms;

    h1{
        width: 30%;
        height: auto;
        font-family: sans-serif;
        font-size: 3rem;
        font-weight: 600;
        color: #FFFFFF;

        @media(max-width: 1024px){
            font-size: 2.5rem;
        }

    }

    @media(max-width: 800px){
        height: 100vh;
    }

    div:last-child{
        width: 0px;
        height: 0px;
        border-top: 50px solid #FFFFFF;
        border-left: 50px solid #FFFFFF00;
        border-right: 50px solid #FFFFFF00;
        margin-right: 10%;
        -moz-animation: ${ bounceAnimation } 2s infinite;
        -webkit-animation: ${ bounceAnimation } 2s infinite;
        animation: ${ bounceAnimation } 2s infinite;
    }

    @media(max-width: 800px){ 
        h1{
            width: 90%;
            margin-bottom: 100px;
        }
    }

`

export const ExplainService = styled.div`
    width: 100%;
    height: 1000px;
    padding: 50px 0px;
    background: rgb(0,0,0);
    background: 
        linear-gradient(0deg, 
            rgba(0,0,0,1) 0%, 
            rgba(0,0,0,1) 14%, 
            rgba(46,16,83,1) 34%, 
            rgba(63,12,126,1) 48%, 
            rgba(46,16,83,1) 58%, 
            rgba(0,0,0,1) 80%, 
            rgba(0,0,0,1) 100%);

    div.cards-container{
        width: 100%;
        max-width: 1600px;
        height: 100%;
        margin: 0px auto;
        display: grid; 
        grid-template-columns: 50% 50%; 
        grid-template-rows: 1fr 1fr; 
        grid-template-areas:
            "card1" "card2"
            "card3" "card4";

        @media(max-width: 1200px){
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
` 

export const CardHomePage = styled.div<CardHomePageProps>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div.content{
        width: 90%;
        height: 90%;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 120ms;
        background-image: url(${ props => props.backgroundImage });
        background-repeat: no-repeat;
        background-size: cover;
        grid-area: ${ props => props.gridArea };
        position: relative;

        h1{
            z-index: 1;
            color: #FFFFFF;
            margin: 3px;
            font-family: sans-serif;
            font-weight: 600;
            font-size: 2.7rem;
            text-align: center;
            transition: 200ms;

            @media(max-width: 1200px){
                font-size: 2.1rem;
            }
        }

        svg{
            z-index: 1;
            color: #FFFFFF;
            width: 50px;
            height: 50px;
        }

        p{
            margin: 3px;
            width: 90%;
            color: #FFFFFF;
            display: none;
            word-wrap: break-word;
            text-align: center;
            font-family: sans-serif;
            font-weight: 500;
            font-size: 1.5rem;
            transition: 200ms;
            z-index: 1;

            @media(max-width: 1200px){
                font-size: 1.3rem;
            }
        }

        ${props => props.selected && css`
            cursor: pointer;
            width: 95%;
            height: 95%;

            p{
                display: block;
                animation-name: ${ fadeAnimation };
                animation-duration: 300ms;
            }

            svg{
                display: none;
            }
        `}

        &:hover{
            cursor: pointer;
            width: 95%;
            height: 95%;

            p{
                display: block;
                animation-name: ${ fadeAnimation };
                animation-duration: 200ms;
            }

            svg{
                display: none;
            }
        }

        &:before{
            content: "";
            width: 100%;
            height: 100%;
            background-color: ${ props => props.backgroundColor };
            position: absolute;
            border-radius: 20px;
        }

        @media(max-width: 1200px){
            width: 80%;
            padding: 10px;
            height: 80%;
            p{
                font-size: 1rem;
            }

            ${props => props.selected && css`
                width: 90%;
                height: 90%;
                padding: 10px;
            `}

            &:hover{
                cursor: pointer;
                width: 90%;
                height: 90%;
            }
        }
    }
`

export const MoreInfo = styled.div`
    width: 100%;
    max-width: 1600px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    div{
        width: 25%;
        height: 200px;
        margin: 10px 0px 50px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        svg{
            width: 80px;
            height: 80px;
            color: #FFFFFF;
            transition: 150ms;
        }

        p{
            color: #FFFFFF;
            font-family: sans-serif;
            font-size: 2.5rem;
            text-align: center;
            margin: 0px;
            transition: 150ms;
        }

        &:hover{
            p{
                font-size: 2.6rem;
            }

            svg{
                width: 95px;
                height: 95px;
            }
        }
    }

    @media(max-width: 800px){
        flex-direction: column;
        margin-bottom: 50px;

        div{
            width: 90%;
            height: 150px;

            svg{
                width: 70px;
                height: 70px;
            }
    
            p{
                font-size: 2rem;
            }
        }

    }
`

export const Footer = styled.footer`
    width: 100%;
    height: 25px;
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    position: fixed;
    bottom: 0;

    div{
        width: 100%;
        max-width: 1600px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        p{
            font-family: Roboto, sans-serif;
            font-size: 1.3rem;
            color: #FFFFFF;
            margin: 0px;
    
            &:hover{
                cursor: pointer;
            }

            &:nth-child(2){
                margin-left: -5%;
            }
        }
    
        @media(max-width: 800px){
            p:not(:first-child){
                display: none;
            }
        }
    }
`

export const LoginModalContent = styled.div`
    width: 100%;
    height: 100vh;
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;

    div.modal-content{
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        background-color: rgba(10,10,10,.90);
        box-sizing: border-box;
        border: 2px solid #FFFFFF;
        border-radius: 10px;
        box-shadow: 0 5px 10px rgba(5,5,5,.2);
        color: white;

        header{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: flex-start;
            margin-bottom: 30px;
    
            img{
                width: 28%;
                padding: 0;
                margin: 0 auto;
            }
    
            button{
                position: absolute;
                background-color: #FFFFFF00;
                border: none;
    
                svg{
                    color: #FFFFFF;
                    margin-top: 10px;
                    transition: 150ms;
    
                    &:hover {
                        cursor: pointer;
                        color: #787878;
                    }
                }
            }
        }
    
        section{
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
`

export const SocialMediaModal = styled.div`
    width: 500px;
    height: 200px;
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    a{
        padding: 0px;
        border: none;
        background-color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        user-select: none;

        svg{
            width: 100px;
            height: 100px;
            background-clip: padding-box;
            transition: 120ms;
        }
        
        &:first-child svg{
            background: linear-gradient(0deg, rgba(252,204,99,1) 0%, rgba(251,173,80,1) 7%, rgba(233,89,80,1) 28%, rgba(233,89,80,1) 40%, rgba(205,72,107,1) 57%, rgba(188,42,141,1) 68%, rgba(138,58,185,1) 98%, rgba(76,104,215,1) 100%);
            border-radius: 15px;
            color: #FFFFFF;

            &:hover{
                width: 120px;
                height: 120px;
            }
        }

        &:nth-child(2) svg{
            color: #4267B2;
            width: 130px;
            height: 130px;

            &:hover{
                width: 150px;
                height: 150px;
            }
        }

        &:last-child svg{
            color: #000000;

            &:hover{
                width: 120px;
                height: 120px;
            }
        }
    }
`