// const express = require/("express")
import express, {type Router} from "express";
// import  from "./users.controller";
// const controllerData = require("./users.controller")
import controllerData from "./users.controller.ts";
const router:Router = express.Router()

router.get("/byName/:name", controllerData.getUserByName)
router.get("/byId/:id", controllerData.getUserById)
// router.post("/create", controllerData.createUsersMany)

export default router