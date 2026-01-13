import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
export function userMiddleware(req:Request, res:Response, next:NextFunction){
    const token = req.headers.authorization as string
    const jwtSecret = process.env.USER_JWT_PASSWORD
    
    if (!jwtSecret) {
        res.status(500).json({message: "JWT secret not configured"})
        return
    }
    
    try{
        const decode = jwt.verify(token, jwtSecret) as any
        if(decode.userId){
            req.userId= decode.userId
            next()
        }else{
            res.status(403).json({message:"Invalid token"})
        }

    }catch(e){
        res.status(403).json({message:"Invalid token"})
    }
}