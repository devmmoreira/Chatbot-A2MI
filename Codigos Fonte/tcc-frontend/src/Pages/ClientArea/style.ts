import styled from 'styled-components'
import { css } from 'styled-components'
import { fadeAnimation } from '../../Themes/animations'

import UserAreaBg from '../../Assets/user-area-bg.jpeg'

interface MenuUserOptionsProps {
    menuUserSelected?: boolean
}

interface EditUserModalFieldProps{
    isFull?: boolean
}

export const ClientAreaPage = styled.div`
    width: 100%;
    height: 100vh;
    background: url(${ UserAreaBg });
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    h1{ margin: 0px}
`

export const ClientHeader = styled.div<MenuUserOptionsProps>`
    width: 100%;
    height: 10vh;
    background-color: #252222;
    display: flex;
    justify-content: center;
    align-items: center;

    header{
        width: 100%;
        height: auto;
        max-width: 1600px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        button.mobile-menu{
            display: none;
            background-color: #FFFFFF00;
            border: none;
            margin-left: 20px;
            border-radius: 50%;
            transition: 200ms;

            svg{
                color: #FFFFFF;
                transition: 200ms;
            }

            &:hover{
                cursor: pointer;
            }

            &:active{
                background-color: #363131;

                svg{
                    color: #c2c2c2;
                }
            }

            @media(max-width: 800px){
                display: block;
            }
        }

        img{
            width: 6%;
            min-width: 50px;
            min-height: 50px;
            margin-left: 25px;

            &:hover{
                cursor: pointer;
            }
        }

        div.user-welcome{
            margin-right: 25px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            p{
                font-family: sans-serif;
                color: #FFFFFF;
                font-size: 1.3rem;
                text-align: right;
                margin-right: 25px;

                @media(max-width: 800px){
                    display: none;
                }
            }

            button{
                background-color: #FFFFFF00;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: 150ms;

                svg{
                    color: #FFFFFF;
                    width: 6vh;
                    height: 6vh;
                    pointer-events: none;
                }

                &:hover{
                    cursor: pointer;
                }

                &:active{
                    background-color: #363131;
                }

                ${ props => props.menuUserSelected && css`
                    background-color: #363131;
                `}
            }
        }
    }
`

export const MenuUserOptions = styled.div`
    width: auto;
    height: auto;
    background-color: #FFFFFF;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-right: 10px;

    button{
        width: 150px;
        height: 40px;
        background-color: #FFFFFF00;
        border: none;
        text-align: right;
        padding-right: 10px;
        font-family: sans-serif;
        transition: 150ms;

        &:hover{
            cursor: pointer;
            background-color: #d9d9d9;
            border-radius: 5px;
        }
    }

    button + button{
        border-top: 2px solid #000000;
    }
`

export const EditUserModal = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    div.modal-content{
        background-color: #FFFFFF;
        width: 30%;
        min-width: 500px;
        padding: 20px;
        border-radius: 10px;
        position: relative;

        button.close{
            position: absolute;
            top: 0;
            right: 0;
            border: none;
            background-color: #FFFFFF00;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 3px;
            
            &:hover{
                cursor: pointer;
            }            
        }

        form{
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 6%;
            justify-content: center;
            align-items: center;
            
            button{
                width: 100%;
                height: 35px;
                border: none;
                border-radius: 5px;
                color: #FFFFFF;
                font-size: 1.5rem;
                font-weight: 600;
                background-color: #252222;
                animation: ${ fadeAnimation } 200ms;
                transition: 250ms;
    
                &:hover{
                    cursor: pointer;
                }
    
                &:active{
                    background-color: #FFFFFF;
                    color: #252222;
                }
            }
        }


        @media(max-width: 600px){
            min-width: 250px;
            width: 80%;
            form{
                justify-content: flex-start;
            }
        }
    }
`

export const EditUserModalField = styled.div<EditUserModalFieldProps>`
    width: ${ props => props.isFull ? 100 : 47 }%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    label{
        height: 35px;
        font-size: 1.3rem;
        display: flex;
        align-items: center;

        @media(max-width: 428px){
            font-size: 0.8rem;
        }
    }

    input{
        margin: 0px;
        width: ${ props => props.isFull ? 94.3 : 88 }%;
        height: 35px;
        padding: 0px 13px;
        border-radius: 10px;
        border: 2px solid black;
        outline: none;
        font-size: 1.1rem;
    }

    p{
        margin: 0px;
        width: 95%;
        height: 37px;
        padding: 0px 13px;
        background-color: #d1d1d1;
        border-radius: 10px;
        font-size: 1.1rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    svg.inside-input{
        position: absolute;
        right: 0;
        bottom: 0;
        margin-bottom: 8px;
        margin-right: 5px;
        
        @media(max-width: 500px){
            margin-right: -5px;
        }
    }

    @media(max-width: 500px){
        width: ${ props => props.isFull ? 98 : 45 }%;
    }

    @media(max-width: 350px){
        width: ${ props => props.isFull ? 95 : 44 }%;
    }
`

export const ClientAreaSection = styled.div`
    width: 100%;
    max-width: 1600px;
    padding-top: 6vh;
    height: 88vh;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    overflow-x: hidden;

    nav{
        background-color: #252222;
        width: 20%;
        height: 300px;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        animation: ${ fadeAnimation } 200ms;

        a{
            width: 100%;
            height: 80px;
            border: none;
            background-color: #FFFFFF00;
            color: #FFFFFF;
            font-family: sans-serif;
            font-size: 1.8rem;
            transition: 150ms;
            text-decoration: none;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;

            &:hover{
                cursor: pointer;
                background-color: #363131;
            }

        }

        a.selected{
            background-color: #FFFFFF;
            color: #252222;

            &:hover{
                cursor: pointer;
                background-color: #FFFFFF;
            }
        }

        a + a{
            border-top: 2px solid #FFFFFF;
        }

        @media (max-width: 800px){
            display: none;
        }
    }
    
    section{
        width: 70%;
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;

        div.home-info{
            opacity: 0.3;
        }

        @media(max-width: 800px){
            width: 100%;
        }
    }
`

export const MobileMenu = styled.div`
    position: relative;
    background-color: #25222242;
    backdrop-filter: blur(5px);
    width: 30vh;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;

    button{
        border: none;
        background-color: #FFFFFF00;

        svg{
            color: #FFFFFF;
        }
    }

    a{
        background-color: #252222;
        width: 100%;
        height: 50px;
        text-decoration: none;
        color: #FFFFFF;
        font-family: sans-serif;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 200ms;
        
        &:active,
        &:hover{
            cursor: pointer;
            background-color: #363131;
        }
    }

    a + a{
        margin-top: 1px;
    }
`