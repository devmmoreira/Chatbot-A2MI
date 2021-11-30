import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JWTConfig } from '../Config/JWTConfig'

const VerifyUserAuthentication = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const authHeaderToken = request.headers.authorization

    if(!authHeaderToken){
        return response.status(400).json({
            title: "Access Denied",
            message: "JWT is missing"
        })
    }

    try{
        verify(authHeaderToken , JWTConfig.signKey)

        return next()
    } catch (err){
        console.log(err)
        return response.status(401).json({
            title: "Access Denied",
            message: "You dont have permission to makes this request, invalid jwt"
        })
    }
}

export default VerifyUserAuthentication