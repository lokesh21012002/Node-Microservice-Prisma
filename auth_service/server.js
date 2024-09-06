import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cors from "cors"
import Routes from "./routes/index.js"
// import {prisma} from "./config/db.config"
const app=express()
dotenv.config({path:"./.env.auth"})

const PORT=process.env.PORT||5000;


// Middlewares
app.use(express.json())
// app.use(express,urlencoded({extended:true}))
app.use(cors())
app.use(Routes)


console.log(PORT);


app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
    console.log(process.env.DATABASE_URL);
    
    
})

app.get("/",(req,res)=>{
    return res.json({message: "Hello, World! from auth microservice"})
 
})






