import postsMethods from "./posts.service.ts";
import type {IControllerContract } from "./posts.types.ts";
const controllerMethods:IControllerContract = {
    getPostById: async (req,res) => {
        
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(422).json("id must be a number");
            return;
        }
        const responseData = await postsMethods.getPostById(id)
        
        res.status(responseData.status).json(responseData.response)
    },
    getAllPosts: async (req,res) => {
        const skip = req.query.skip
        const take = req.query.take
        let filter = Boolean(req.query.filter)
        const responseData = await postsMethods.getAllPosts(skip,take,filter)
        res.status(responseData.status).json(responseData.response)
    },
    createUserPost: async (req,res) => {

        const userId = res.locals.userId
        const body = req.body
        // if server can't get body or user didn't indicate body in request
        if (!body){
            res.status(422).json("request must have body")
            return;
        }
        const responseData = await postsMethods.createUserPost(body,userId)
        res.status(responseData.status).json(responseData.response)

    },
    updateUserPost: async (req,res) => {
        const id = Number(req.params.id)
        const userId = res.locals.userId
        if (isNaN(id)) {
            res.status(422).json("id must be a number");
            return;
        }
        const body = req.body;
        if (!body){
            res.status(422).json("request must have body");
            return;
        }
        // if (typeof body.name !== "string" && body.name != undefined) {
        //     res.status(422).json("name must be a string or undefined");
        //     return;
        // }
        // if (typeof body.description !== "string" && body.description != undefined) {
        //     res.status(422).json("description must be a string or undefined");
        //     return;
        // }
        // if (typeof body.img !== "string" && body.img != undefined) {
        //     res.status(422).json("img must be a string or undefined");
        //     return;
        // }
        const responseData = await postsMethods.updateUserPost(id,body,userId);
        res.status(responseData.status).json(responseData.response)

    },
    deletePost: async (req,res) => {
        const id = Number(req.params.id)
        const userId = res.locals.userId
        if (isNaN(id)){
            res.status(400).json("id must be a number");
        }
        const responseData = await postsMethods.deletePost(id,userId);
        res.status(responseData.status).json(responseData.response)
    },
    createPosts: async (req,res) => {
        const body = req.body
        if (req.query.id == undefined){
            res.status(422).json("request doesn't have userId or server can't get userId")
            return
        }
        const userId:number = Number(req.query.id)
        if (isNaN(userId)){
            res.status(422).json("userId must be a number")
            return
        }
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
        const responseData = await postsMethods.createPosts(count,userId)
        res.status(responseData.status).json(responseData.response)
    },
    likePost: async (req,res) => {
        const postId = Number(req.params.id)
        const userId = res.locals.userId
        if (isNaN(postId)){
            res.status(400).json("postId must be a number");
        }
        const responseData = await postsMethods.likePost(postId,userId);
        if (typeof responseData== typeof undefined){
            return
        }
        
        res.status(responseData.status).json(responseData.response)
    },
    unlikePost: async (req,res) => {
        const postId = Number(req.params.id)
        const userId = res.locals.userId
        if (isNaN(postId)){
            res.status(400).json("postId must be a number");
        }
        const responseData = await postsMethods.unlikePost(postId,userId);
        
        res.status(responseData.status).json(responseData.response)
    },
    comment: async(req, res) => {
        if (!req.body){
            res.status(422).json("request doesn't have body or server can't get body, try to set type of body 'raw' or 'x-www-form-urlencoded'")
            return
        }
        const postId = Number(req.params.id)
        const body = req.body.body
        const userId = res.locals.userId

        if (isNaN(postId)){
            res.status(400).json("postId must be a number");
        }
        if (!body){
            res.status(400).json("body must be a string");
        }
        
        const responseData = await postsMethods.makeComment(body,postId,userId);
        
        res.status(responseData.status).json(responseData.response)
    },
}
export default controllerMethods