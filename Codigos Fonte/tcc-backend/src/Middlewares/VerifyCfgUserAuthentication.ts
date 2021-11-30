import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JWTConfig } from '../Config/JWTConfig'

import AppError from '../errors/AppError'

const VerifyCfgUserAuthentication = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const authHeaderToken = request.headers.authorization

    if(!authHeaderToken){
        return response.status(400).json({
            title: "Access Denied",
            message: "JWT is missing"
        })
    }

    try{
        verify(authHeaderToken , JWTConfig.signKey, (error, decode) => {
            if(error){ 
                return response.status(401).json({
                    title: "Access Denied",
                    message: "Invalid jwt"
                })
            }

            if(decode?.sub !== "62d00c23-b98a-4b30-8c52-6d78a128faef"){
                return response.status(401).json({
                    title: "Access Denied",
                    message: "Invalid user"
                })
            }
        })

        return next()
    } catch (err: any){
        console.log(err?.message)
        return response.status(401).json({
            title: "Access Denied",
            message: "You dont have permission to makes this request, invalid jwt"
        })
    }
}

export default VerifyCfgUserAuthentication