import tagsMethods from "./tag.service.ts";
import type {getData, IControllerContract } from "./tag.types.ts";
const controllerMethods:IControllerContract = {
    getAll: async (req,res) => {
        const params:getData = {}
        const skip = Number(req.query.skip)
        const take = Number(req.query.take)
        !isNaN(skip) ? params.skip = Number(skip) : 0
        !isNaN(take) ? params.take = take : 0
        const tags = await tagsMethods.getAll(params)
        res.status(tags.status).json(tags.response)
    },
    getById: async (req,res) => {
        const id:number = Number(req.params.id)
        if (isNaN(id)){
            res.status(400).send("id is wrong, write /id in end")
        }
        const tags = await tagsMethods.getById(id)
        res.status(tags.status).json(tags.response)
    }
}
export default controllerMethods