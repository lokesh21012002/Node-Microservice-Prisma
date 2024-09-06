import bcrypt from "bcrypt"
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js"
class AuthController{
    static async register(req,res){
        try{
        const payload = req.body;
        const salt=bcrypt.genSaltSync(10)
        payload.password=bcrypt.hashSync(payload.password,salt)
        const existingUser=await prisma.user.findUnique({
            where:{
                email:payload.email
            }
        })
        if(existingUser){
            return res.status(400).json({message:"Email already exists"})
        }

        console.log(payload);
        const user=await prisma.user.create({
            data:payload,
        })
        return  res.status(201).json({"message":"User created sucessfully",user})

    }

    catch(err){
        console.log(err);
        return res.status(500).json({"messaage":"Something went wrong"})

        
    }
   
    }


    static async login(req,res){
        try{
        const payload = req.body;
        const email=payload.email;
        const user=await prisma.user.findUnique({
            where:{email:email},
        })
        
        if(!user){
            return res.status(404).json({"message":"User not found"})

        }
        const isValid=bcrypt.compareSync(payload.password,user.password)
        if(!isValid || user.name!==payload.name ){
            return res.status(401).json({"message":"Invalid Creds"})
            }
            payload.id=user.id

            const jwtToken=jwt.sign(payload,process.env.SECRET_KEY,{
                expiresIn:"365d",
            })

            const reponse={
                id:user.id,
                name:user.name,
                email:user.email,
                jwt:`Bearer ${jwtToken}`
                
            }

          



        return res.status(200).json({"message":"Sucess",reponse})
        

    }

    catch(err){
        console.log(err);
        return res.status(500).json({"messaage":"Something went wrong"})

        
    }
   
    }

    static async user(req,res){
        const user=req.user;
        // console.log();
        
        return res.status(200).json({user:user})
    }
}

export default AuthController