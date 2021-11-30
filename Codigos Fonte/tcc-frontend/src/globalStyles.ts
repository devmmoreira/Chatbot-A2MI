import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #000000;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
    }

    .MuiDrawer-paper{
        background-color: #ffffff00 !important;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-button {
        width: 7px;
        height: 7px;
    }

    ::-webkit-scrollbar-thumb {
        background: #726dba;
        border: none;
        border-radius: 47px;
        transition: 150ms;

        &:hover{
            background: #6554bb;
        }

        &:active{
            background: #6621ba;
        }
    }

    ::-webkit-scrollbar-track {
        background: #ffffff00;
        border: none;
        border-radius: 19px;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }
`