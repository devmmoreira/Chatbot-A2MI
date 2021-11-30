import styled from "styled-components"
import { css } from "styled-components"
import { fadeAnimation, shakeAnimation } from "../../Themes/animations"

interface FormFieldsProps {
    isError?: boolean
}

export const Support = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: auto;
`

export const SupportAssistantForm = styled.form`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    animation-name: ${ fadeAnimation };
    animation-duration: 250ms;

    header{
        width: 80%;
        height: auto;
        padding: 20px;
        margin-bottom: 10px;

        p{
            margin: 0px;
            font-family: sans-serif;
            font-size: 1.8rem;
        }
    }

    div.form-content{
        width: 100%;
        max-width: 900px;
        height: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;

        @media(max-width: 800px){
            width: 94%;
            align-items: center;
        }
    }

    button{
        width: 80%;
        height: 35px;
        border: none;
        border-radius: 5px;
        color: #FFFFFF;
        font-size: 1.5rem;
        font-weight: 600;
        background-color: #252222;
        transition: 250ms;

        &:hover{
            cursor: pointer;
        }

        &:active{
            background-color: #FFFFFF;
            color: #252222;
        }
    }

    @media(max-width: 800px){
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        div.form-content{
            width: 94%;
            padding: 0px;
            align-items: center;
        }
    }
`

export const Formfield = styled.div<FormFieldsProps>`
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;

    label{
        font-family: sans-serif;
        font-size: 1.6rem;
        margin-bottom: 10px;
    }

    input, 
    select{
        height: 40px;
        font-family: sans-serif;
        font-size: 1.2rem;
        border: 2px solid black;
        border-radius: 5px;
        outline: none;
    }

    textarea{
        height: 20vh;
        min-height: 80px;
        font-family: sans-serif;
        font-size: 1.2rem;
        border: 2px solid black;
        border-radius: 5px;
        outline: none;
        resize: none;
    }

    ${props => props.isError? 
        css`
            input,
            select,
            textarea{
                animation-name: ${ shakeAnimation };
                animation-duration: 160ms;
                border: 2px solid #a60011;
            }
        `:
        css`
            input,
            select,
            textarea{
                border: none;
                border: 2px solid black;
            }
        `
    }
`