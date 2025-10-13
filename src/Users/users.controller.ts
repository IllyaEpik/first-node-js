import usersMethods from "./users.service.ts";
import type{ Request,Response } from "express";
const controllerData =  {
    getUserByName: async (req: Request,res: Response) => {
        const name:String = String(req.params.name)
        // if request doesn't have name
        if (!name){
            await res.status(422).json("server can't get name")
            return
        }
        const responseData = await usersMethods.getUserByName(name)
        await res.status(responseData.status).json(responseData.response)
    },
    
    getUserById: (req: Request,res: Response) => {
        const id:number = Number(req.params.id)
        if (isNaN(id)){
            res.status(422).json("id must be a number, but is not a number")
            return;
        }
        const fields: string | undefined = typeof req.query.fields === "string" ? req.query.fields : undefined;
        // const fields = req.query.fields
        const responseData = usersMethods.getUserById(id,fields);
        res.status(responseData.status).json(responseData.response)
    },
    // createUsersMany: async (req: Request,res: Response) => {
    //     const body = req.body
    //     const responseData = await usersMethods.createUsersMany(body)
    //     await res.status(responseData.status).json(responseData.response)

    // }
}
export default controllerData