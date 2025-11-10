import usersMethods from "./user.service.ts";
// import type{ Request,Response } from "express";
import type{ IControllerContract } from "./user.types.ts";
const controllerData:IControllerContract =  {
    registation: async (req,res) => {
        const userData = req.body
        if (!userData){
            res.status(422).json("server can't get body ")
        }
        const user = await usersMethods.registation(userData)
        res.status(200).json(user)
    },
    login: async (req, res) => {
        const userData = req.body
        if (!userData){
            res.status(422).json("server can't get body ")
        }
        
        const user = await usersMethods.login(userData)
        res.status(200).json(user)
    },
}
export default controllerData