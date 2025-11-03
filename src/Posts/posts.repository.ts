

import Prisma from "../db/prisma.ts";
import client from "../db/prismaClient.ts";
import type{IPostsWithTags, IRepositoryContract } from "./posts.types.ts";

const repositoryFunctions:IRepositoryContract={
    getAllPosts:async (getData) =>{
        const posts = await client.post.findMany(getData)
        return posts
    },
    getPostById: async (id) => {
        const post = await client.post.findFirst({
            where:{id:id}
        })
        console.log(post)
        return post
    },
    createPostByUser: async (posts) => {
        
        // const batch = await client.post.createMany({
        //     data:posts,
        //     include: { tags: true }
        // })
        let count;
        for (count = 0; count < posts.length; count++ ){
            const post = posts[count]
            if (post==undefined){
                break
            }
            // post["include"] = {tags:true}
            await client.post.create({
                data:post,
                include: { tags: true }
            })
            
        }
        
        const countOfPosts = await client.post.count()-count
        return await repositoryFunctions.getAllPosts({
            skip:countOfPosts,
            take:count
        })
    },
    updatePost: async (id,postData) => {    
        return await client.post.update({
            where:{id:id},
            data:postData
        })
    },
    deletePost: async (id) => {    
        try {
            const post = await client.post.delete({
                where:{id:id}
            })
            return {
                status: 200,
                response: post
            }
        }
        
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                return {
                    status: 404,
                    response: `post with id ${id} is not found`
                }
            }
            return {
                status: 404,
                response: String(error)
            }
        }
        
    }

}
export default repositoryFunctions