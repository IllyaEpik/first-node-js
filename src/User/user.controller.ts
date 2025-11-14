import usersMethods from "./user.service.ts";
// import type{ Request,Response } from "express";
import type{ IControllerContract,IJWT } from "./user.types.ts";
import jwt from "jsonwebtoken";
import SECRET_KEY from "../config/env.ts";
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
    me: async (req,res) => {
        try {
            const encodedToken = req.headers.authorization;

            if (!encodedToken){
                res.status(401).json("where is token")
                return
            }
            const [bearer, token] = encodedToken.split(" ")
            if (bearer!= "Bearer"){
                return
            }
            if (typeof token !== "string"){
                return
            }
            const decoded = jwt.verify(token,SECRET_KEY) as IJWT
            // const {bearer, Realtoken} = token.split(" ")
            const user = await usersMethods.me(decoded.id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(String(error))
            
        }
        
    }
}
export default controllerData