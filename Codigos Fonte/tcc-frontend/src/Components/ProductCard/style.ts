import styled from "styled-components"
import { css } from "styled-components"

interface ProductsCardProps{
    img: string,
    isSelected?: boolean
}

export const ProductsCard = styled.div<ProductsCardProps>`
    z-index: 1;
    width: 400px;
    height: 500px;
    margin: 20px 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-image: url(${ props => props.img });
    background-repeat: no-repeat;
    background-size: 100% 400px;
    background-position: top center;
    position: relative;
    
    div.description{
        background-color: #FFFFFF;
        height: 100px;
        transition: 150ms;
        overflow: hidden;
        padding: 0px 10px;

        h1{
            font-family: sans-serif;
            font-weight: 700;
        }

        P{
            font-family: sans-serif;
            font-size: 1.2rem;
            text-align: justify;
            display: none;
            transition: 150ms;
        }

        h2{
            margin-top: -10px;
            color: #1d012a;
        }

    }
    
    &:before{
        content: "";
        background: rgb(255,255,255);
        background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.87718837535014) 47%, rgba(255,255,255,0) 100%);
        width: 100%;
        height: 40px;
    }

    &:after{
        content: "";
        background: rgb(255,255,255);
        width: 100%;
        height: 20px;
        border-radius: 0px 0px 15px 15px;
    }

    button{
        display: none;
        border: none;
        height: 40px;
        transition: 150ms;
        position: relative;
        margin-bottom: -20px;
        border-radius: 0px 0px 15px 15px;
        background-color: #074c91;
        font-family: sans-serif;
        font-size: 1.5rem;
        color: #FFFFFF;
        transition: 150ms;

        &:hover{
            cursor: pointer;
        }

        &:active{
            background-color: #1d012a;
            color: #c7c7c7;
        }
    }

    &:hover{
        div.description{
            height: 250px;

            h1{
                margin-top: -25px;
                position: absolute;
                z-index: 2;
            }

            p{
                display: block;
            }

            h2{
                margin: 10px 0px;
                font-size: 2.5rem;

                @media (max-width: 600px){
                    margin: 0px;
                }
            }
        }

        button{
            display: block;
        }

        cursor: pointer;

        &:after{ display: none }
    }

    ${props => props.isSelected && css`
        &:after{ display: none }
        
        div.description{
            height: 250px;

            h1{
                margin-top: -25px;
                position: absolute;
                z-index: 2;
            }

            p{
                display: block;
            }

            h2{
                margin-top: 25px;
                font-size: 2.5rem;

                @media (max-width: 600px){
                    margin: 0px;
                }
            }
        }

        button{
            display: block;
        }
    `}
`