// import path from "path";
// import fs from "fs";
// import fsPromises from "fs/promises";
import type{getData, IPosts, IServiceContract,IPostCreate, IPostUpdate } from "./posts.types.ts";
import create from "../Generator.ts";
import repository from "./posts.repository.ts";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const pathToJson = path.join(__dirname+"/posts.json")


// let allPostsJson:IPosts[] = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));

const postsMethods: IServiceContract = {
    getPostById: async (id) => {
        // const object = allPostsJson.find(object => object.id == id)
        const object = await repository.getPostById(id);
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

    getAllPosts: async (skip,take,filter) => {
            
            
            // if skip isn't undefined 
            const gottenData:getData = {

            }
            if (skip){
                let skipNumber = Number(skip)
                // if take isn't a number
                if (isNaN(skipNumber)){
                    return {
                        status:400,
                        response: "skip must be a number"
                    }
                }
                gottenData.skip = skipNumber
                // localPosts.splice(0,skipNumber)
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
                gottenData.take = takeNumber
                // localPosts.splice(takeNumber,localPosts.length-takeNumber)
            }
            let localPosts:IPosts[] = await repository.getAllPosts(gottenData)
            // if filter isn't undefined and it is true
            if (filter){
                localPosts = localPosts.filter(object => object.name.includes("a"))
            }
            return {
                status:200,
                response: localPosts
            }
    },
    createUserPost: async (body) => {
        try {
            
            let listOfRequests = [body]
            // if user want to create many posts
            if (Array.isArray(body)){
                listOfRequests = body
            }
            for (const item of listOfRequests){
                // if user didn't indicate name for post
                if (!item.name && item.name.trim() === ""){
                    return {
                        status: 422,
                        response: "request must have name"
                    }
                }
                // if user didn't indicate description for post
                if (!item.description && item.description!=""){
                    return {
                        status: 422,
                        response: "request must have description"
                    }
                }
                // if user didn't indicate img for post
                if (item.img != null && typeof item.img != "string"){
                    return {
                        status: 422,
                        response: "request must have img"
                    }
                }
                
                // if user didn't indicate user for post
                if (isNaN(Number(item.userId))){
                    return {
                        status: 422,
                        response: "request must have img"
                    }
                }
            }
            await repository.createPostByUser(listOfRequests)
            return {
                status: 200,
                response: await repository.getAllPosts({})
            }
        } catch (error:unknown) {
            return {
                status: 500,
                response: String(error)
            }
        }
    },
    updateUserPost: async (id,body:IPostUpdate) => {
        try{
            const post = await repository.updatePost(id,body)
            // await fsPromises.writeFile(pathToJson, JSON.stringify(allPostsJson,null,4))
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
    createPosts: async (count,userId) => {
        try {
            const postsData:IPostCreate[] = await create.createPost(count,userId)
            const posts:IPosts[] = await repository.createPostByUser(postsData)
            // allPostsJson = JSON.parse(await fsPromises.readFile(pathToJson, "utf-8"))
            return {
                    status: 200,
                    response: posts
                };
        } catch (error) {
           return {
                    status: 500,
                    response: String(error)
                }
        }
    },
    deletePost: async (id) => {
        try{
            const post = await repository.deletePost(id)
            return post
        }catch(error:unknown){
            return {
                response:String(error),
                status:500
            }
        }
        
    }
}

export default postsMethods