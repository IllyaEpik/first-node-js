import express from "express";
import type{Router} from "express";
import controllerData from "./tag.controller.ts";

const router:Router = express.Router()
router.get("/find/:id", controllerData.getById)
router.get("/all", controllerData.getAll)
router.post("/create", controllerData.create)
export default router