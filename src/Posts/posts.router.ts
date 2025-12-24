import express from "express";
import type{Router} from "express";
import controllerData from "./posts.controller.ts";
import authMiddleware from "../middlewares/auth-Middleware.ts";

const router:Router = express.Router()
router.get("/find/:id", controllerData.getPostById)
router.get("/all", controllerData.getAllPosts)
router.post("/create",authMiddleware, controllerData.createUserPost)
router.patch("/update/:id",authMiddleware, controllerData.updateUserPost)
router.delete("/delete/:id",authMiddleware, controllerData.deletePost)
router.put("/like/:id",authMiddleware, controllerData.likePost)
router.delete("/unlike/:id",authMiddleware, controllerData.unlikePost)
router.post("/:id/comment",authMiddleware,controllerData.comment)
router.post("/auto/create",authMiddleware, controllerData.createPosts)

export default router