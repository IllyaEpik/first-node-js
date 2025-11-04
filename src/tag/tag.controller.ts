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
    },
    create: async (req, res) => {
        let name = req.body
        if (typeof name === "string"){
            name = Array(name)
        }
        if (name==undefined){
            res.status(400).send("request must have a name")
        }
        const ans = await tagsMethods.create(name)
        res.status(ans.status).send(ans.response)    
        
    },
}
export default controllerMethods