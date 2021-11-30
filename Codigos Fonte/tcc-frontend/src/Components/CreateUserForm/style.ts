import styled from 'styled-components'
import { css } from 'styled-components'

import { shakeAnimation, fadeAnimation } from '../../Themes/animations'

interface InputCreateUserProps {
    hasValue: boolean
    isError?: boolean
}

export const CreateUserForm = styled.form`
    width: 100%;
    background-color: #FFFFFF00;
    box-sizing: border-box;
    color: white;
    animation-name: ${ fadeAnimation };
	animation-duration: 200ms;
    margin-top: -20px;

    header{
        text-align: center;
        width: 100%;

        h1{
            font-family:sans-serif;
            color: #ffffff;
        }

        img{
			width: 40%;
			margin-bottom: 40px;
			padding: 0;
		}
    }

    section{
        width: 100%;
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr; 
        gap: 0px 0px; 
        grid-template-areas: 
            "col1 col2"; 

        div.col-1,
        div.col-2{
            width: 100%;
            height: 100%;
            padding-left: 5%;
        }

        div.col-1{
            grid-area: col1
        }

        div.col-2{
            grid-area: col2
        }
    }

    footer{
        width: 100%;
        display: flex;
        margin-top: 1vh;
        justify-content: center;
        align-items: center;

        button{
            margin: 20px;
            border: none;
            width: 80%;
            height: 40px;
            font-family: sans-serif;
            font-size: 1.5rem;
            transition: 150ms;
            display: flex;
            justify-content: center;
            align-items:center;
            transition: 150ms;
            
            &:hover {
                cursor: pointer;
                background-color: #787878;
            }
        }
    }
`

export const InputCreateUser = styled.div<InputCreateUserProps>`
    width: 90%;
    height: 55px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;

    label{
        font-family: sans-serif;
        font-size: 1.3rem;
        color: #FFFFFF;
        margin-bottom: -30px;
        margin-left: 10px;
        transition: 200ms;

        @media(max-width: 800px){
            font-size: 1rem;
        }
    }

    input{
        background-color: #FFFFFF00;
        box-sizing: border-box;
        outline: none;
        width: 100%;
        height: 35px;
        border: none;
		border-bottom: 2px solid rgba(255,255,255,.80);
        padding-left: 5px;
        font-family: sans-serif;
        font-size: 1.1rem;
        color: #777777;
        transition: 200ms;

        ${ props => props.isError && css`
            animation-name: ${ shakeAnimation };
            border: 2px solid red;
            border-radius: 5px;
        `}

        ::-webkit-calendar-picker-indicator {
            filter: invert(1);
        }       
    }

    input[type="date"]{
        color: #77777700;
    }

    svg{
        position: absolute;
        margin-left: 90%;
        margin-bottom: 4px;
        transition: 120ms;
        background-color: rgba(10,10,10,.90);

        @media (max-width: 570px){
            margin-left: 85%;
        }

        &:hover{
            cursor: pointer;
        }
    }

    ${ props => props.hasValue && css`
        label{
            margin: 0px;
            font-size: 1rem;

            @media(max-width: 800px){
                font-size: 0.7rem;
            }
        }

        input[type="date"]{
            color: #777777;
        }
    `}
`

