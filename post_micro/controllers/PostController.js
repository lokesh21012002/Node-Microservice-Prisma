import { response } from "express";
import prisma from "../ config/db.config.js"
import axios from "axios";

class PostController{

    static async index(req,res){
        try{
            const posts=await prisma.post.findMany({})

            // Method 2 instead of doing API calls again and again we get All Users in one Call
            //  and filter on basis of user id

            const userIDS=posts.map((post)=> {return post.user_id})
            console.log(userIDS);

            const users=await (await axios.post("http://localhost:3000/api/getUsers",userIDS)).data.users
            console.log(users);
            

            // const response=posts.map((post)=>{
            //     const user=users.find((user)=> user.id===post.user_id)
            //     return {post,user}
            // })
            // Method 3

            // storing id and user object for fast acess kind of hashing

            
            const usersMaped={}
           users.forEach(element => {
                usersMaped[element.id]=element
            });

            const response=posts.map(post=>{
                return {post:post, user:usersMaped[post.user_id]}

            })

            console.log(usersMaped);
            

            return res.status(200).json(response)



            // Method 1 Brute force





            

            // const userNew = await Promise.all(
            // posts.map(async (item) => {
            //     const response = await axios.get(`http://localhost:3000/api/getUser/${item.user_id}`);
            //     console.log(response.data.user.name);
            //     return {...item,
            //         user:response.data.user}; // return the name to store in userNew
            // })
            //     );
            // return res.status(200).json({userNew})
        }
        catch(err){

            console.log(err);
            
            return res.status(500).json({"message":"Something went wrong :( "})
        }
    }


    static async store(req,res){
        try{
        const authUser=req.user ;
        const {title,content}=req.body;
        console.log(title,content);
        const post=await prisma.post.create({
            data:{
                user_id:authUser.id,
                title:title,
                content:content
            }
        })

        return res.status(200).json({"message":"sucess",post})

    }
    catch(err){
        console.log(err);
        
        return res.status(500).json(err);

    }

        

    }
}

export default PostController