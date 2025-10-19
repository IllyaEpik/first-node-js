import { PrismaClient } from "../generated/prisma/index.js";
import type{ getData, IPosts,IPostCreate,IPostUpdate } from "./posts.types.ts";
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
    update: async (id:number,postData:IPostUpdate) => {    
        return client.post.update({
            where:{id:id},
            data:postData
        })
    }

}
export default repositoryFunctions