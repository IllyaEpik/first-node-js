import usersMethods from "./user.service.ts";
// import type{ Request,Response } from "express";
import type{ IControllerContract } from "./user.types.ts";
const controllerData:IControllerContract =  {
    checkAndSend: async (data,res) => {
        try {
            if (typeof data=="string"){
                const splitedData = data.split("|")
                let [text,stringStatus] = splitedData
                const status = Number(stringStatus)
                if (isNaN(status) || status>599 || status<100){
                    res.status(500).json(`status is wrong (for delevoper), status: ${status}`)
                    return
                }
                res.status(status).json(text)
                return
            }
            
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(String(error))
            
        }
        
    },
    registation: async (req,res) => {
        const userData = req.body
        if (!userData){
            res.status(422).json("server can't get body ")
        }
        const user = await usersMethods.registation(userData)
        controllerData.checkAndSend(user,res)
        // res.status(200).json(user)
    },
    login: async (req, res) => {
        const userData = req.body
        if (!userData){
            res.status(422).json("server can't get body ")
        }
        
        const user = await usersMethods.login(userData)
        controllerData.checkAndSend(user,res)
        // res.status(200).json(user)
    },
    me: async (req,res) => {
        const id = res.locals.userId
        console.log(id)
        const user = await usersMethods.me(id)
        controllerData.checkAndSend(user,res)
    }
    //     try {
    //         const encodedToken = req.headers.authorization;

    //         if (!encodedToken){
    //             res.status(401).json("where is token")
    //             return
    //         }
    //         const [bearer, token] = encodedToken.split(" ")
    //         if (bearer!= "Bearer"){
    //             return
    //         }
    //         if (typeof token !== "string"){
    //             return
    //         }

    //         const decoded = jwt.verify(token,SECRET_KEY) as IJWT
    //         if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
    //             res.status(401).json("invalid token payload")
    //             return
    //         }
    //         const id = Number((decoded as any).id)
    //         if (isNaN(id)) {
    //             res.status(401).json("invalid token id")
    //             return
    //         }
    //         // const {bearer, Realtoken} = token.split(" ")
    //         const user = await usersMethods.me(decoded.id)
    //         await controllerData.checkAndSend(user,res);
    //         // res.status(200).json(user)
    //     } catch (error) {
    //         if ((error as any).name === "TokenExpiredError") {
    //             res.status(401).json("token expired")
    //             return
    //         }
    //         res.status(500).json(String(error))
    //     }
        
    // }
}
export default controllerData