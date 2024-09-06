import jwt from "jsonwebtoken"


const authMiddleware=(req,res,next)=>{

    const authHeader=req.headers.authorization;
    if(authHeader===null|| authHeader===undefined){
        return res.status(401).json({message:"Unauthorized"})



    }
    const token=authHeader.split(" ")[1]
    jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
        if(err){
            return res.status(403).json({message:"Token is invalid"})
            }
            console.log("Aurth user",payload);
            
            req.user=payload;
            next();
            })
            

}

export default authMiddleware