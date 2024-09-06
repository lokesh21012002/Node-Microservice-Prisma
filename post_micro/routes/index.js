import { Router } from "express";
import PostRoute from "./postRoutes.js"

const router=Router()

router.use("/api",PostRoute)




export default router;
