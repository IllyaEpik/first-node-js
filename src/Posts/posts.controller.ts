
// const postsMethods = require("")
import postsMethods from "./posts.service.ts";
import type{ Request, Response } from "express";
import type { IAnswer, IcountBody, IPostCreate, IPostUpdate } from "./posts.types.ts";
export default {
    getPostById: (req:Request,res:Response) => {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(422).json("id must be a number");
            return;
        }
        const responseData = postsMethods.getPostById(id)
        res.status(responseData.status).json(responseData.response)
    },
    getAllPosts: (req:Request,res:Response) => {
        const skip = String(req.query.skip)
        const take = String(req.query.take)
        let filter:boolean = Boolean(req.query.filter)
        const responseData:IAnswer = postsMethods.getAllPosts(skip,take,filter)
        res.status(responseData.status).json(responseData.response)
    },
    createUserPost: async (req:Request,res:Response) => {
        const body:IPostCreate = req.body
        // if server can't get body or user didn't indicate body in request
        if (!body){
            res.status(422).json("request must have body")
            return;
        }
        const responseData:IAnswer = await postsMethods.createUserPost(body)
        res.status(responseData.status).json(responseData.response)

    },
    updateUserPost: async (req:Request,res:Response) => {
        const id:number = Number(req.params.id)
        if (isNaN(id)) {
            res.status(422).json("id must be a number");
            return;
        }
        const body:IPostUpdate = req.body;
        if (!body){
            res.status(422).json("request must have body");
            return;
        }
        if (typeof body.name !== "string" && body.name != undefined) {
            res.status(422).json("name must be a string or undefined");
            return;
        }
        if (isNaN(Number(body.likes)) && body.likes != undefined) {
            res.status(422).json("likes must be a number or undefined");
            return;
        }
        if (typeof body.description !== "string" && body.description != undefined) {
            res.status(422).json("description must be a string or undefined");
            return;
        }
        if (typeof body.img !== "string" && body.img != undefined) {
            res.status(422).json("img must be a string or undefined");
            return;
        }
        const responseData:IAnswer = await postsMethods.updateUserPost(id,body);
        res.status(responseData.status).json(responseData.response)

    },
    createPosts: async (req:Request,res:Response) => {
        const body:IcountBody = req.body
        // if server can't get body or user didn't indicate body in request
        if (!body){
            res.status(422).json("request doesn't have body or server can't get body, try to set type of body 'raw' or 'x-www-form-urlencoded'")
            return
        }
        // if user didn't indicate count in body
        if (!body.count){
            res.status(422).json("body must have count of posts")
            return 
        }
        let count:number = Number(body.count)
        // if count isn't a number
        if (isNaN(count)){
            res.status(422).json("count must be number")
            return 
        }
        // if count is too big
        if (count>1000){
            res.status(422).json("count too big, count must be smaller than 1000")
            return
        }
        const responseData = await postsMethods.createPosts(count)
        res.status(responseData.status).json(responseData.response)
    }
    
}