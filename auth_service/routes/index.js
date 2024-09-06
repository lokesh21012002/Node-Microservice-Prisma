import { Router } from "express";
import AuthRoute from "./authRoutes.js"
import UserRoute from "./userRoutes.js"

const router=Router()

router.use("/api",AuthRoute)
router.use("/api",UserRoute)






export default router