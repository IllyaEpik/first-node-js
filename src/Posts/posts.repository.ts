
import { Prisma, PrismaClient } from "../generated/prisma/index.js";
import type{ getData, IPosts,IPostCreate,IPostUpdate, IAnswer } from "./posts.types.ts";
const client = new PrismaClient

const repositoryFunctions={
    getAllPosts:async (getData:getData):Promise<IPosts[]> =>{
        const posts = await client.post.findMany(getData)
        return posts
    },
    getPostById: async (id:number) => {
        const post = await client.post.findFirst({
            where:{id:id}
        })
        console.log(post)
        return post
    },
    createPostByUser: async (posts:IPostCreate[]) => {
        const batch = await client.post.createMany({
            data:posts
        })
        const countOfPosts = await client.post.count()-batch.count
        return await repositoryFunctions.getAllPosts({
            skip:countOfPosts,
            take:batch.count
        })
    },
    updatePost: async (id:number,postData:IPostUpdate) => {    
        return await client.post.update({
            where:{id:id},
            data:postData
        })
    },
    deletePost: async (id:number): Promise<IAnswer> => {    
        try {
            const post = await client.post.delete({
                where:{id:id}
            })
            return {
                status: 200,
                response: post
            }
        }
        
        catch (error:unknown) {
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