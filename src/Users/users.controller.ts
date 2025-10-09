import usersMethods from "./users.service.ts";
import type{ Request,Response } from "express";
const controllerData =  {
    getUserByName: async (req: Request,res: Response) => {
        const name:String = String(req.params.name)
        const responseData = await usersMethods.getUserByName(name)
        await res.status(responseData.status).json(responseData.response)
    },
    
    getUserById: async (req: Request,res: Response) => {
        const id:Number = Number(req.params.id)
        const fields: string | undefined = typeof req.query.fields === "string" ? req.query.fields : undefined;
        // const fields = req.query.fields
        const responseData = await usersMethods.getUserById(id,fields);
        await res.status(responseData.status).json(responseData.response)
    },
    // createUsersMany: async (req: Request,res: Response) => {
    //     const body = req.body
    //     const responseData = await usersMethods.createUsersMany(body)
    //     await res.status(responseData.status).json(responseData.response)

    // }
}
export default controllerData