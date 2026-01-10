

import Prisma from "../db/prisma.ts";
import client from "../db/prismaClient.ts";
// import { generatePosts } from "../Generator.ts";
import type{IPostFull, IRepositoryContract } from "./posts.types.ts";

const repositoryFunctions:IRepositoryContract={
    getAllPosts:async (getData) =>{
        const posts = await client.post.findMany({
            ...getData,
            include:{
                tags:{
                    include:{
                        relationWithTag:true
                    }
                },
                commnets:true,
                likesToPosts:true
            }
        })
        const readablePost:IPostFull[] = []
        posts.map((post) => {
            const {likesToPosts,tags,commnets,...other} = post
            readablePost.push({
                ...other,
                likes:likesToPosts.map((like) => like.userId),
                comments:commnets.map((comment) => {return comment.body}),
                tags: tags.map((tag) => {return tag.relationWithTag.name})
            })
        })
        return readablePost
    },
    getPostById: async (id) => {
        const post = await client.post.findUnique({
            where:{id:id},
            include:{
                tags:true,
                commnets:true,
                likes:true
            }
        })
        if (!post){
            return "error"
        }
        const {likes,tags,commnets,...other} = post
        const realTags = await client.tag.findMany({
            where:{
                id:{
                    in:tags.map((relationWithTag)=>{return relationWithTag.tagId})
                }
            },
            omit:{
                id:true
            }
            
        })
        const readAblePost:IPostFull = {
            ...other,
            comments:commnets.map((comment)=>{return comment.body}),
            likes:likes.map((like)=>{return like.id}),
            tags:realTags.map((tag) => {return tag.name})
        }
        return readAblePost
    },
    // createPosts: async (count,userId) => {
    //     const data = await generatePosts(count,userId)
    //     const posts = await client.post.createManyAndReturn({
    //         data
    //     })
        
    //     return posts
    // },
    createPostByUser: async (posts,userId) => {
        let count;
        for (count = 0; count < posts.length; count++ ){
            const post = posts[count]
            if (post==undefined){
                break
            }
            post.userId = userId
            console.log(post,userId)
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
        
        const {tags, ...other} = postData
        // if (tags){
        //     const relations = await client.tagsOnPosts.createMany({
        //         data:[
        //             tags?.map(()=> {
    
        //             })
        //         ]
        //     })
        // }
        return await client.post.update({
            where:{id:id},
            data:{
                ...other,   
                // ...(tags && {
                //     tags: {
                //         create: {
                //             relationWithTag:{
                //                 connect:{
                //                     id:2
                //                 }
                //             }
                                
                //         }
                //     }
                // })
            }
        })
    },
    deletePost: async (id) => {    
        try {
            const post = await client.post.delete({
                where:{id:id}
            })
            
            return post
        }
        
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                return `post with id ${id} is not found`
            }
            return String(error)
        }
    },  
    likePost: async (postId,userId) => {
        const like = await client.likesToPost.create({
            data:{
                postId,
                userId
            },
            include:{
                post:true
            }
        })
        const likes = await client.likesToPost.findMany({
            where:{
                postId:postId
            }
        })
        return likes.map((like)=> {return like.userId})

        
    },
    unlikePost: async (postId,userId) => {
        const deletedLike = await client.likesToPost.delete({
            where:{
                postId_userId:{
                    postId,
                    userId
                }
            }
        })
        const likes = await client.likesToPost.findMany({
            where:{
                postId:postId
            }
        })
        return likes.map((like)=> {return like.userId})
        // return deletedLike.post
    },
    createComment: async (body, postId, userId) => {
        const comment = await client.comment.create({
            data:{
                body,
                postId,
                userId
            }
        })
        return comment
    },
    // addTagsToPost: async (id, names) => {
    //     try {
    //         const post = await client.post.update({
    //             tags:
    //         })
    //         return {
    //             status: 200,
    //             response: post
    //         }
    //     }
        
    //     catch (error) {
    //         if (error instanceof Prisma.PrismaClientKnownRequestError){
    //             return {
    //                 status: 404,
    //                 response: `post with id ${id} is not found`
    //             }
    //         }
    //         return {
    //             status: 404,
    //             response: String(error)
    //         }
    //     }
    // },

}
export default repositoryFunctions