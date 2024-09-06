import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router=Router()

router.post("/auth/register",AuthController.register)

router.post("/auth/login",AuthController.login)

// private route

router.get("/auth/user",authMiddleware,AuthController.user)



export default router

