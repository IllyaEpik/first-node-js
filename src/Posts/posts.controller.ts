
// const postsMethods = require("")
import postsMethods from "./posts.service.ts";
import type{ Request, Response } from "express";
export default {
    getPostById: (req:Request,res:Response) => {
        const id = Number(req.params.id)
        const responseData = postsMethods.getPostById(id)
        res.status(responseData.status).json(responseData.response)
    },
    getAllPosts: (req:Request,res:Response) => {
        const skip = String(req.query.skip)
        const take = String(req.query.take)
        const filter = Boolean(req.query.filter)
        const responseData = postsMethods.getAllPosts(skip,take,filter)
        res.status(responseData.status).json(responseData.response)
    },
    createUserPost: async (req:Request,res:Response) => {
        const body = req.body
        const responseData = await postsMethods.createUserPost(body)
        res.status(responseData.status).json(responseData.response)

    },
    // createPosts: async (req:Request,res:Response) => {
    //     const body = req.body
    //     const responseData = await postsMethods.createPosts(body)
    //     res.status(responseData.status).json(responseData.response)
    // }
    
}