import styled from 'styled-components'
import { css } from 'styled-components'

import { shakeAnimation, fadeAnimation } from '../../Themes/animations'

interface InputFormLoginProps{
	containsValue?: boolean,
	isError?: boolean
}

export const LoginForm = styled.form`
	width: 90%; 
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	animation-name: ${ fadeAnimation };
	animation-duration: 200ms;

	button{
		width: 90%;
		height: 40px;
		margin-top: 30px;
		font-family: sans-serif;
		font-size: 1.5rem;
		transition: 150ms;

		&:hover {
			cursor: pointer;
			background-color: #787878;
		}
	}

	button + button {
		margin-bottom: 30px;
	}
`

export const LoginFormInput = styled.div<InputFormLoginProps>`
	position: relative;
	width: 90%;
	//max-width: 400px;

	label{
		position: absolute;
		top: 10px;
		left: 0;
		transition: 0.5s;
		pointer-events: none;
		font-size: 1.3rem;
		font-family: sans-serif;
		width: 100%;
		text-align: center;

		${(props) => (props.containsValue) && css`
			top: -15px;
			left: 0;
			margin-left: -46%;
			font-size: 1rem;
		`}

		${props => props.isError? 
			css` color: #a60011; `
			:
			css` color: #FFFFFF; `
		}
	}

	input{
		color: white;
		padding: 10px 0;
		margin-bottom: 30px;
		width: 100%;
		height: 45px;
		font-family: sans-serif;
		font-size: 1.3rem;
		background-color: #FFFFFF00;
		box-sizing: border-box;
		outline: none;
		border: none;
		border-bottom: 2px solid rgba(255,255,255,.80);
		padding-left: 10px;

		${props => props.isError? 
			css`
				animation-name: ${ shakeAnimation };
				animation-duration: 160ms;
				border: 2px solid #a60011;
				border-radius: 5px;
			`:
			css`
				border: none;
				border-bottom: 2px solid rgba(255,255,255,.80);
				border-radius: 0px;
			`
		}
	}
` 

export const ShowPasswordField = styled.div`
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	accent-color: #f34F74;
	transition: 100ms;

	p{
		margin: 0px;
		font-family: sans-serif;
		font-size: 1.1rem;
		margin-left: 5px;

		&:hover{
			cursor: default;
		}
	}
`