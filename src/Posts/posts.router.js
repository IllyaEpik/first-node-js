const express = require("express")
const controllerData = require("./posts.controller")
const router = express.Router()
router.get("/find/:id", controllerData.getPostById)
router.get("/all", controllerData.getAllPosts)
router.post("/create", controllerData.createUserPost)
router.post("/update", controllerData.createPosts)
module.exports = router