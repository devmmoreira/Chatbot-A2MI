import styled from "styled-components"
import { css } from "styled-components"

import { invertFadeAnimation } from "../../Themes/animations"

interface ChnageLoginOptions{
    togle?: boolean
}

export const MenuBar = styled.div`
    width: 100%;
    max-width: 1600px;
    height: auto;
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 5;

    div.menu-mobile{
        display: none;
    }

    div.logo{
        width: auto;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 25px;

        img{
            width: 210px;
            height: 160px;

            &:hover{
                cursor: pointer;
            }
        }

        div.pipeline{
            height: 180px;
            width: 5px;
            margin-left: 54px;
            background-color: #FFFFFF;
        }
    }

    div.actions{
        width: 50%;
        display: flex;
        justify-content: space-between;

        a{
            background-color: #FFFFFF00;
            border: none;
            font-family: Roboto, sans-serif;
            font-size: 2rem; 
            color: #FFFFFF;
            text-decoration: none;
            font-weight: 600;
            transition: 180ms;

            &:hover{
                color: #a8a8a8;
                cursor: pointer;
            }

            @media(max-width: 950px){
                font-size: 1.7rem;
            }
        }
    }

    div.user-area{
        margin-right: 25px;
        svg{
            color: #FFFFFF;
            width: 80px;
            height: 80px;
            transition: 160ms;

            &:hover{
                color: #a8a8a8;
                cursor: pointer;
            }
        }
    }

    @media(max-width: 800px){
        padding-top: 10px;

        div.menu-mobile{
            display: block;
            padding-left: 10px;

            button{
                width: auto;
                height: auto;
                border: none;
                background-color: #FFFFFF00;
                padding: 2px;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: 150ms;

                svg{
                    color: #FFFFFF;
                    width: 40px;
                    height: 40px;
                }

                &:active{
                    background-color: #3654c2c4;
                    
                    svg{
                        color: #cccccc;
                    }
                }
            }
        }

        div.logo{
            margin: 0px;
            img{
                width: 70px;
                height: 70px;
            }

            .pipeline{
                display: none;
            }
        }

        div.actions{
            display: none;
        }

        div.user-area{
            margin-right: 5px;

            svg{
                width: 50px;
                height: 50px;

                &:active{
                    color: #a8a8a8;
                }
            }
        }
    }
`

export const MobileMenuBarButtons = styled.div`
    width: 201px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #b7bdda42;
    backdrop-filter: blur(5px);

    hr{
        width: 199px;
        height: 3px;
        margin: 0px;
    }

    header{
        width: 200px;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10px;

        img{
            width: 60px;
            height: 50px;
            margin-left: 3px;
        }

        button{
            width: auto;
            height: auto;
            border: none;
            background-color: #FFFFFF00;
            padding: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 150ms;

            svg{
                transition: 150ms;
            }

            &:active{
                svg{
                    color: #050448;
                }
            }
        }
    }

    a{
        width: 100%;
        height: 40px;
        border: none;
        background-color: #7688e242;
        color: #082456;
        font-family: sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 150ms;

        &:active{
            background-color: #074c91;
            color: #FFFFFF;
        }
    }

    a.selected{
        background-color: #074c91;
        color: #FFFFFF;
    }
`

export const LoginModalContent = styled.div<ChnageLoginOptions>`
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

            ${ props => props.togle && css`
                animation-name: ${ invertFadeAnimation };
                animation-duration: 200ms;
                opacity: 0;
            `}
        }
    }

`