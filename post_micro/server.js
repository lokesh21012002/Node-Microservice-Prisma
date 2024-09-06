import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Routes from "./routes/index.js"


const app=express()
dotenv.config({path:"./.env.post"})

console.log(process.env.PORT);


const PORT=process.env.PORT||5001;



// Middlewares
app.use(express.json())
app.use(cors())


app.use(Routes);


console.log(PORT);


app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
    console.log(process.env.DATABASE_URL);
    
    
})

app.get("/",(req,res)=>{
    return res.json({message: "Hello, World! fro post micorservice"})
 
})






