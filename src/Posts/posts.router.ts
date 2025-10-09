// const express = require("express")
import express from "express";
import type{Router} from "express";
import controllerData from "./posts.controller.ts";
// const controllerData = require("./posts.controller")
const router:Router = express.Router()
router.get("/find/:id", controllerData.getPostById)
router.get("/all", controllerData.getAllPosts)
router.post("/create", controllerData.createUserPost)
// router.post("/update", controllerData.createPosts)
export default router