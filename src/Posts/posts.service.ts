import type{getData, IPosts, IServiceContract,IPostCreate } from "./posts.types.ts";
import create from "../Generator.ts";
import repository from "./posts.repository.ts";
import userRepository from "../User/user.repository.ts";



const postsMethods: IServiceContract = {
    getPostById: async (id) => {
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
            }
            // if take isn't undefined 
            if (take){
                const takeNumber = Number(take)
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
    createUserPost: async (body,userId) => {
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
                // if (isNaN(Number(item.userId))){
                //     return {
                //         status: 422,
                //         response: "request must have img"
                //     }
                // }
            }
            await repository.createPostByUser(listOfRequests,userId)
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
    updateUserPost: async (id,body,userId) => {
        try{
            const user = await userRepository.getUserById(userId)

            const post = await repository.getPostById(id)
            if (typeof post === "string"){
                return {
                    response:post,
                    status:400
                }
            }
            if (post?.userId!=user?.id){
                return {
                    response:"you are not a creator of this post",
                    status:400
                }
            }
            
            const updatedPost = await repository.updatePost(id,body)
            // await fsPromises.writeFile(pathToJson, JSON.stringify(allPostsJson,null,4))
            return {
                response:updatedPost,
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
            const posts:IPosts[] = await repository.createPostByUser(postsData,userId)
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
    deletePost: async (id,userId) => {
        try{
            const user = await userRepository.getUserById(userId)
            const post = await repository.getPostById(id)
            if (typeof post === "string"){
                return {
                    response:post,
                    status:400
                }
            }
            if (post?.userId!=user?.id){
                return {
                    response:"you are not a creator of this post",
                    status:403
                }
            }
            const deletedPost = await repository.deletePost(id)
            return {
                response:deletedPost,
                status:204
            }
        }catch(error:unknown){
            return {
                response:String(error),
                status:500
            }
        }
    },
    likePost: async (postId, userId) =>{
        const data = await repository.likePost(postId,userId)
        return {
            response:data,
            status:201
        }
    },
    unlikePost: async (postId, userId) =>{
        const data = await repository.unlikePost(postId,userId)
        return {
            response:data,
            status:204
        }
    },
    makeComment: async (body, postId, userId) =>{
        const comment = await repository.createComment(body, postId, userId)
        return {
            response:comment,
            status:200
        }
    },
}

export default postsMethods