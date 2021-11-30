import { keyframes } from "styled-components";

//animation-name: ${animation imported}

export const shakeAnimation = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`

export const fadeAnimation = keyframes`
    from{
        opacity: 0;
        transform: scale(0.9);
    } to {
        opacity: 1;
        transform: scale(1);
    }

`

export const invertFadeAnimation = keyframes`
    from{
        opacity: 1;
        transform: scale(1);
    } to {
        opacity: 0;
        transform: scale(100%);
    }

`

export const bounceAnimation = keyframes`
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-30px);
    }
    
    60% {
        transform: translateY(-15px);
    }
`

export const ligthBlur = keyframes`
    0% { 
        -webkit-filter: blur(0px); 
    }

    100% { 
        -webkit-filter: blur(5px); 
    }
`