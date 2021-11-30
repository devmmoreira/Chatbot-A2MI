import styled from "styled-components"
import { css } from "styled-components"
import { fadeAnimation } from "../../Themes/animations"

export const Chatbots = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;

    table + table {
        margin-top: 25px;
    }

    @media(max-width: 800px){
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
`

export const ChatbotsCard = styled.table`
    border-collapse: collapse;
    background-color: #252222;
    width: 100%;
    height: auto;
    border-radius: 10px;
    transition: 250ms;
    animation: ${ fadeAnimation } 200ms;
    
    thead{
        color: #FFFFFF;
        font-family: sans-serif;
        font-size: 1.1rem;
        font-weight: 600px;
        
        tr{
            th{
                padding: 10px;
                text-align: left;

                &:nth-child(1){
                    width: 15%;
                }
        
                &:nth-child(2){
                    width: 45%;
                }
                
                &:nth-child(3){
                    width: 20%;
                } 

                &:nth-child(4){
                    width: 20%;
                } 
            }

            th + th{
                border-left: 2px solid #FFFFFF;            
            }
        } 
    } 

    tbody{
        color: #FFFFFF;
        font-family: sans-serif;
        font-size: 1rem;
        
        tr{
            td{
                padding: 10px;
                text-align: left;
        
                &:nth-child(2){
                    width: 40%;
                } 
            }

            td + td{
                border-left: 2px solid #FFFFFF;            
            }
        } 
    }
    
    &:hover{
        cursor: default;
        background-color: #363131;
    }

    @media(max-width: 800px){
        display: none;
    }
`

export const ChatbotsCardMobile = styled.div`
    display: none;
    
    @media(max-width: 800px){
        background-color: #252222;
        width: 90%;
        height: auto;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        transition: 250ms;

        div.row{
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        & + &{
            margin-top: 10px;
        }
    }
`
export const ChatbotsCardMobileField = styled.div<{ isFull?: boolean }>`
    ${ props => props.isFull && css`width: 100% !important;`}
    width: 33%;
    min-height: 100px;

    label{
        color: #FFFFFF;
        font-size: 1.2rem;
        font-weight: 600;
    }

    p{
        width: auto;
        height: auto;
        min-height: 50px;
        background-color: #ffffff;
        font-size: 1.1rem;
        padding: 5px;
        border-radius: 5px;
    }

    & + & {
        margin-left: 10px;
    }
`