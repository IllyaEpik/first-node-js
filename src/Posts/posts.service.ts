import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import type{ IAnswer, IPostCreate, IPosts, IPostUpdate } from "./posts.types.ts";
import create from "../Generator.ts";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToJson = path.join(__dirname+"/posts.json")


let allPostsJson:IPosts[] = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));

const postsMethods = {
    getPostById: (id:Number): IAnswer => {
        const object = allPostsJson.find(object => object.id == id)
        // if post with id is undefined
        if (!object){
            return {
                status:400,
                response: `doesn't exists post with id ${id}`
            };
        }
        return {
                status:200,
                response: object
            }
    },

    getAllPosts: (skip:String,take:String,filter:Boolean): IAnswer => {
            
            let localPosts = [ ...allPostsJson ]
            // if filter isn't undefined and it is true
            if (filter){
                localPosts = localPosts.filter(object => object.name.includes("a"))
            }
            // if skip isn't undefined 
            if (skip){
                let skipNumber = Number(skip)
                // if take isn't a number
                if (isNaN(skipNumber)){
                    return {
                        status:400,
                        response: "skip must be a number"
                    }
                }
                localPosts.splice(0,skipNumber)
            }
            // if take isn't undefined 
            if (take){
                let takeNumber = Number(take)
                // take = Number(take)
                // if take isn't a number
                if (isNaN(takeNumber)){
                    return {
                        status:400,
                        response: "take must be a number"
                    }
                }
                localPosts.splice(takeNumber,localPosts.length-takeNumber)
            }
            return {
                status:200,
                response: localPosts
            }
    },
    createUserPost: async (body:IPostCreate): Promise<IAnswer> => {
        try {
            
            let listOfRequests = [body]
            // if user want to create many posts
            if (Array.isArray(body)){
                listOfRequests = body
            }
            const newListOfRequests:IPosts[] = [];
            let newId = allPostsJson.length+1
            for (const item of listOfRequests){
                // if user didn't indicate name for post
                if (!item.name && item.name.trim() === ""){
                    return {
                        status: 422,
                        response: "request must have name"
                    }
                }
                // if user didn't indicate description for post
                if (!item.description){
                    return {
                        status: 422,
                        response: "request must have description"
                    }
                }
                // if user didn't indicate img for post
                if (!item.img){
                    return {
                        status: 422,
                        response: "request must have img"
                    }
                }
                const newItem:IPosts = {
                    id:newId,
                    name:item.name,
                    description:item.description,
                    img:item.img,
                    likes:0
                }
                newListOfRequests.push(newItem)
                newId++
            }
            // joining arrays
            allPostsJson = await allPostsJson.concat(newListOfRequests)
            await fsPromises.writeFile(pathToJson, JSON.stringify(allPostsJson,null,4))
            return {
                status: 200,
                response: allPostsJson
            }
        } catch (error:unknown) {
            return {
                status: 500,
                response: String(error)
            }
        }
    },
    updateUserPost: async (id:number,body:IPostUpdate):Promise<IAnswer> => {
        try{
            const post:IPosts | undefined = allPostsJson.find((item) => {return item.id == id})
            if (post ===undefined){
                return {
                    response:`post with id ${id} is undefined`,
                    status:422
                }
            }
            if (body.description){
                post.description = body.description
            }
            if (body.name){
                post.name = body.name
            }
            if (body.likes){
                post.likes = Number(body.likes)
            }
            if (body.img){
                post.img = body.img
            }
            await fsPromises.writeFile(pathToJson, JSON.stringify(allPostsJson,null,4))
            return {
                response:post,
                status:200
            }
        }catch(error:unknown){
            return {
                response:String(error),
                status:500
            }
        }
        
    },
    createPosts: async (count:number) => {
        try {
            await create.createPost(count)
            allPostsJson = JSON.parse(await fsPromises.readFile(pathToJson, "utf-8"))
            return {
                    status: 200,
                    response: allPostsJson
                };
        } catch (error) {
            console.log(error)
           return {
                    status: 500,
                    response: String(error)
                }
        }
    }
}

export default postsMethods