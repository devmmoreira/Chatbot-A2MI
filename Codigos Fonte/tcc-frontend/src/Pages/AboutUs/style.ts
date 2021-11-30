import styled from "styled-components"
import { css } from "styled-components"

import { fadeAnimation, ligthBlur } from '../../Themes/animations'

interface AboutUsCardProps{
    img: string,
    isSelected?: boolean
}

export const AboutUsPage = styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
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

    div.team{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        p.title{
            margin: 0px;
            color: #FFFFFF;
            font-family: sans-serif;
            font-size: 2rem;
            writing-mode: vertical-rl;
            text-orientation: upright;
        }

        @media (max-width: 800px){
            margin-top: 50px;
            flex-direction: column;

            p.title{
                writing-mode: horizontal-tb;
                text-orientation: upright;
            }
        }
    }


    @media(max-width: 1024px){
        overflow-y: scroll;
    }
`

export const ShowAboutUs = styled.div`
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

    @media (max-width: 1525px){
        max-width: 1000px;
    }
`

export const AboutUsCard = styled.div<AboutUsCardProps>`
    z-index: 1;
    width: 350px;
    height: auto;
    min-height: 500px;
    margin: 20px 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-image: url(${ props => props.img });
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    position: relative;
    
    div.description{
        height: 100px;
        transition: 150ms;
        padding: 0px 10px;
        overflow: hidden;
        border-radius: 0px 0px 15px 15px;
        background: rgb(0,0,0);
        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.87718837535014) 47%, rgba(0,0,0,0) 100%);

        h1{
            font-family: sans-serif;
            font-weight: 700;
            color: #FFFFFF;
        }

        P{
            font-family: sans-serif;
            font-size: 1.2rem;
            text-align: justify;
            display: none;
            transition: 150ms;
            color: #FFFFFF;
        }
    }

    &:hover{
        div.description{
            height: 250px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.87718837535014) 65%, rgba(0,0,0,0) 100%);

            h1{
                margin-top: -220px;
                position: absolute;
                z-index: 2;
            }

            p{
                display: block;
            }
        }

        cursor: pointer;
    }

    ${props => props.isSelected && css`
        div.description{
            height: 250px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.87718837535014) 65%, rgba(0,0,0,0) 100%);

            h1{
                margin-top: -220px;
                position: absolute;
                z-index: 2;
            }

            p{
                display: block;
            }
    `}
    
`