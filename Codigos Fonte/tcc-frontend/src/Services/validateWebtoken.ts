import { decode } from 'jsonwebtoken'

export const validateWebToken = () => {
    const userData = localStorage.getItem('userData') || ""

    try{
        const token = JSON.parse(userData).token

        const decodedToken = decode(token, { complete: true })

        if(!decodedToken?.payload.exp){
            return {
                isValid: false,
                token,
                message: "This is not valid JWT Token"
            }  
        }

        if(decodedToken.payload.exp * 1000 < new Date().getTime()){
            return {
                isValid: false,
                token,
                message: "Token is expired"
            }
        }

        return {
            isValid: true,
            token,
            message: "valid Token"
        }

    }catch(err: any){
        return {
            isValid: false,
            token: "",
            message: "Token is not exists"
        }
    }
}