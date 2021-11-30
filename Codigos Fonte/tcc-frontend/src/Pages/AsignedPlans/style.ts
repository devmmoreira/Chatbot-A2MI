import styled from "styled-components"
import { css } from "styled-components"
import { fadeAnimation } from "../../Themes/animations"

interface AsignedPlansPageProps{
    containProducts: boolean
}

export const AsignedPlansPage = styled.div<AsignedPlansPageProps>`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    animation: ${ fadeAnimation } 250ms;

    ${ props => !props.containProducts && css`
        align-items: center;
    `}

    @media(max-width: 1360px){
        flex-wrap: wrap;
    }
`