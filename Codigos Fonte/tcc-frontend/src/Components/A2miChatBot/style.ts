import styled from 'styled-components'
import { css } from 'styled-components'

interface ChatBalloonProps{
    type: "user" | "bot"
}

export const ChatWithChatbot = styled.div`
    background-color: #b7bdda42;
    backdrop-filter: blur(5px);
    height: 100vh;
    width: 60vh;
    min-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    div.texting{
        width: 95%;
        height: 89%;
        border-radius: 10px;
        overflow: auto;
        display: flex;
        flex-direction: column-reverse;
    }

    img{
        width: 100%;
        height: 40px;
        position: relative;
        margin-bottom: -2%;
    }
    
    div.send-text{
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 10px;

        input{
            width: 80%;
            height: 45px;
            padding-left: 20px;
            border: none;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            background-color: #050448;
            color: #FFFFFF;
            font-family: sans-serif;
            font-size: 1.3rem;
            outline: none;
        }

        button{
            width: 10%;
            height: 47px;
            border: none;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: #050448;
            display: flex;
            justify-content: center;
            align-items: center;

            svg{
                color: #FFFFFF;
                transition: 150ms;

                &:hover{
                    color: #c9c9c9;
                    cursor: pointer;
                }
            }
        }
    }

    @media(max-width: 800px){
        width: 42vh;
    }

    @media(max-width: 290px){
        width: 37vh;
    }
`

export const ChatBalloon = styled.div<ChatBalloonProps>`
    ${ props => {
        if(props.type === "user"){
            return css`
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-end;

                p.balloon-title{
                    margin-top: 10px;
                    margin-bottom: 3px;
                }

                p.balloon-message{
                    padding: 10px;
                    border-radius: 10px;
                    margin: 0px;
                    background-color: #86078f;
                    font-family: sans-serif;
                    font-size: 1.3rem;
                    color: #FFFFFF;
                    width: auto;
                    height: auto;
                    max-width: 250px;
                    word-wrap: break-word;
                }
            `
        }

        if(props.type === "bot"){
            return css`
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;

                p.balloon-title{
                    margin-top: 10px;
                    margin-bottom: 3px;
                }

                p.balloon-message{
                    padding: 10px;
                    border-radius: 10px;
                    margin: 0px;
                    background-color: #082456;
                    font-family: sans-serif;
                    font-size: 1.3rem;
                    color: #FFFFFF;
                    width: auto;
                    height: auto;
                    max-width: 250px;
                    word-wrap: break-word;
                }

                div.balloon-options{
                    width: 100%;
                    max-width: 270px;
                    height: auto;
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;

                    button{
                        height: auto;
                        width: auto;
                        padding: 5px 15px;
                        font-family: sans-serif;
                        font-size: 1rem;
                        background-color: #211885;
                        border: none;
                        border-radius: 5px;
                        font-family: sans-serif;
                        font-size: 1.1rem;
                        color: #FFFFFF;
                        transition: 150ms;

                        &:hover{
                            cursor: pointer;
                            background-color: #86078f;
                        }
                    }
                }
            ` 
        }
    }}
`