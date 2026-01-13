import { Router } from "express";
import {prisma} from "db/client";
import { SignUpSchema } from "../types";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { sendEmail } from "../mail";

const router = Router();

router.post("/signup", async(req,res)=>{
    const {success , data} = SignUpSchema.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message:"Incorrect Email format"
        })
        return 
    }
       const user = await  prisma.user.upsert({
        create:{
            email:data.email,
            role:"User"
        },
        update:{},
        where:{
            email:data?.email
        }
       })
       const jwtSecret = process.env.EMAIL_JWT_PASSWORD;
       
       if (!jwtSecret) {
           res.status(500).json({
               message: "Server configuration error: JWT secret not configured"
           });
           return;
       }

       const token = jwt.sign({
        userId:user.id
       }, jwtSecret)


        if(process.env.NODE_ENV==="production"){
             sendEmail(data.email , "Login to Contest platform", `Click this link https://contest.jouls.co.in/post_login/?token=${token}` )
        }else{
            console.log(`Click this link https://contest.jouls.co.in/post_login/?token=${token}`)
        }
        res.json({message:"We have send the email to your mail "})

})

router.post("/signin", async(req,res)=>{

})
router.get("/signin/post", async(req,res)=>{
    try{
        const emailToken = req.query.token as string;
        const emailJwtSecret = process.env.EMAIL_JWT_PASSWORD;
        const userJwtSecret = process.env.USER_JWT_PASSWORD;
        
        if (!emailJwtSecret || !userJwtSecret) {
            res.status(500).json({
                message: "Server configuration error: JWT secrets not configured"
            });
            return;
        }
        
        const decoded = jwt.verify(emailToken, emailJwtSecret) as JwtPayload
        if(decoded.userId){
            const userToken = jwt.sign({
                userId:decoded.userId
            }, userJwtSecret)
            res.json({
                token: userToken
            })
        }else{
            res.status(411).json({
                message:"Invalid token - missing user ID"
            })
        }
    
    }catch(e){
        res.status(403).json({
            message:"Invalid or expired token"
        })
    }
  
})


export default router