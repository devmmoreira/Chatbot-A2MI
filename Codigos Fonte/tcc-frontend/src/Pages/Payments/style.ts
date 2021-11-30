import styled from "styled-components"
import { css } from "styled-components"
import { fadeAnimation } from "../../Themes/animations"

interface PaymentsCardProps{
    status: "open" | "payed" | "latePayment" | "overdue"
}

export const Payments = styled.div`
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

export const PaymentsCard = styled.table<PaymentsCardProps>`
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
                    width: 40%;
                }
        
                &:nth-child(2){
                    width: 10%;
                    text-align: center;
                }
                
                &:nth-child(3){
                    width: 25%;
                    text-align: center;
                } 

                &:nth-child(4){
                    width: 15%;
                    text-align: center;
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

                &:nth-child(1){
                    width: 40%;
                }
        
                &:nth-child(2){
                    width: 10%;
                }
                
                &:not(:first-child){
                    text-align: center;
                }
            }

            td + td{
                border-left: 2px solid #FFFFFF;            
            }

            ${props => props.status === "open" && css`
                td:last-child{
                    color: orange;
                }
            `}

            ${props => props.status === "overdue" && css`
                td:last-child{
                    color: red;
                }
            `}

            ${props => props.status === "latePayment" && css`
                td:last-child{
                    color: orange;
                }
            `}

            ${props => props.status === "payed" && css`
                td:last-child{
                    color: green;
                }
            `}
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

export const PaymentsCardMobile = styled.div<PaymentsCardProps>`
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
        animation: ${ fadeAnimation } 200ms;

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

        ${props => props.status === "open" && css`
            div.row:first-child :last-child p{
                color: orange;
            }
        `}

        ${props => props.status === "overdue" && css`
            div.row:first-child :last-child p{
                color: red;
            }
        `}

        ${props => props.status === "latePayment" && css`
            div.row:first-child :last-child p{
                color: orange;
            }
        `}

        ${props => props.status === "payed" && css`
            div.row:first-child :last-child p{
                color: green;
            }
        `}
    }
`
export const PaymentsCardMobileField = styled.div<{ isFull?: boolean }>`
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
        font-size: 1.2rem;
        padding: 5px;
        border-radius: 5px;
        display: flex;
        align-items: center;

        @media(max-width: 400px){
            font-size: 1rem;
        }
    }

    & + & {
        margin-left: 10px;
    }
`