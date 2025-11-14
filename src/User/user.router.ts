// const express = require/("express")
import express, {type Router} from "express";
// import  from "./users.controller";
// const controllerData = require("./users.controller")
import controllerData from "./user.controller.ts";
const router:Router = express.Router()
router.post("/registration", controllerData.registation)
router.post("/login", controllerData.login)
router.get("/me", controllerData.me)
// router.get("/byName/:name", controllerData.getUserByName)
// router.get("/byId/:id", controllerData.getUserById)
// router.post("/create", controllerData.createUsersMany)

export default router
//     "name":"ok",