import styled from "styled-components"
import { css } from "styled-components"
import { fadeAnimation, ligthBlur } from '../../Themes/animations'

interface FormContactsFields{
    textAreaMaxCount?: number
}

export const ContactsPage = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    img.bg-image{
        position: fixed;
        width: 80%; 
        height: 110vh;
        z-index: -1;
        margin: 0 auto;
        margin-left: -3px;
        filter: blur(5px);
        -webkit-filter: blur(5px);
        animation-name: ${ ligthBlur };
        animation-duration: 800ms;

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

    @media(max-width: 1024px){
        overflow-y: scroll;
    }
` 

export const ContactFormPosition = styled.div`
    width: 100%;
    height: 70vh;
    max-width: 1600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    header,
    section{
        width: 100%;
        animation-name: ${ fadeAnimation };
        animation-duration: 800ms;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    header{
        margin-bottom: 60px;

        p{
            color: #FFFFFF;
            font-family: sans-serif;
            font-weight: 600;
            font-size: 1.7rem;
            text-align: center;
        }

        @media(max-width: 750px){
            margin-bottom: 210px;
        }
    }

    section{
        height: 30vh;
    }

    @media(max-width: 1024px){
        width: 90%;
        height: auto;
        justify-content: flex-start;

        section{
            flex-direction: column-reverse;
            align-items: center;
            height: auto;
        }
    }
`

export const InfoContacts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;

    p{
        font-family: sans-serif;
        font-size: 1.3rem;
        font-weight: 600;
        color: #FFFFFF;
    }
` 

export const FormContacts = styled.form<FormContactsFields>`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 45%;
    flex-wrap: wrap;

    p.count-char{
        color: #FFFFFF;
        font-family: sans-serif;
        width: 100%;
        text-align: right;
        margin: 0px;
        margin-top: -20px;
        transition: 100ms;

        ${ props => {
            if(props.textAreaMaxCount){
                if(props.textAreaMaxCount >= 300){
                    return css`
                        color: #bf2222;
                    `        
                }
            }
        }}

        @media(max-width: 750px){
            margin: 0px;
            margin-bottom: -210px;
        }
    }

    div.infos{
        width: 45%;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 2%;
        padding-top: 11px;

        input{
            height: 40px;
            border-radius: 10px;
            border: none;
            outline: none;
            transition: 150ms;
            padding: 0 15px;
            font-family: sans-serif;
            font-size: 1.2rem;

            &:focus{
                background-color: #e3e3e3;
            }
        }
    }

    div.motive{
        width: 51%;
        height: 190px; 

        textarea{
            width: 100%;
            height: 100%;
            resize: none;
            border-radius: 10px;
            transition: 150ms;
            padding: 6px;
            border: none;
            outline: none;
            font-family: sans-serif;
            font-size: 1.2rem;

            &:focus{
                background-color: #e3e3e3;
            }
        }
    }

    button{
        margin-top: 3vh;
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 10px;
        background-color: #074c9177;
        color: #dce1e6;
        transition: 150ms;
        font-size: 1.7rem;
        font-family: sans-serif;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover{
            cursor: pointer;
        }

        &:active{
            color: #c2c2c2;
            background-color: #7f0fac77;;
        }
    }

    @media(max-width: 1024px){
        width: 90%;
    }

    @media(max-width: 750px){
        flex-direction: column;
        align-items: flex-start;

        div.infos{
            width: 100%;
            height: 170px;
            margin: 0px;
            margin-bottom: 30px;
        }

        div.motive{
            width: 97%;
            margin: 0px;
            padding: 0px;
            height: 170px;

            @media(max-width: 600px){
                width: 96.1%;
            }
        }
    }
` 