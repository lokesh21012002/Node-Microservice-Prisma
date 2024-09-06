import PostController from "../controllers/PostController.js";
import { Router } from "express";
import authMiddleware from "../middlewares/AuthMiddleware.js";


const router=Router()

router.post("/post",authMiddleware,PostController.store)

router.get("/posts",PostController.index)





export default router