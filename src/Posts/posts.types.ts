import type{ Response, Request } from "express";
import Prisma from "../db/prisma.ts";

export type IPosts = Prisma.PostGetPayload<{
    // include:{
    //     tags:true
    // }
}>
export type IPostFull = IPosts & {
    tags:string[],
    likes:number[],
    comments:string[]
}
export type IPostsWithTags = Prisma.PostGetPayload<{
    include:{
        tags:true
    }
}>
export type ITagsOnPosts = Prisma.TagsOnPostsGetPayload<{

}>
export type IPostCreate = Prisma.PostUncheckedCreateInput
export type IPostUpdate = Prisma.PostUncheckedUpdateInput
export type Icommnet = Prisma.CommentGetPayload<{}>
export type ICreatecommnet = Prisma.CommentGetPayload<{
    omit:{
        id:true,
        createdAt:true,
        userId:true
    }
}>
export type IPostCreateChecked = Prisma.PostCreateInput
export type IPostUpdateChecked = Prisma.PostUpdateInput
export interface IPostUpdateAll{
    name?:string,
    img?:string,
    description?:string,
    tags?:number[]
}
export interface getData {
    skip?:number,
    take?:number
}
export interface IcountBody {
    count: number
}
// export interface postLike {
//     postId: number
// }
// export interface IAnswer {
//     response: string | IPosts | IPosts[] | null | IPostUpdateAll,
//     status: number
// } 
export interface IAnswer<T> {
    response: T | string,
    status: number
} 
export interface IServiceContract {
    getPostById: (id:number) => Promise<IAnswer<IPosts | null>>
    getAllPosts: (skip:String | undefined,take:String | undefined,filter:Boolean) => Promise<IAnswer<IPosts[]>>
    createUserPost: (body:IPostCreate,userId:number) => Promise<IAnswer<IPosts[]>>
    updateUserPost: (id:number,body:IPostUpdateAll,userId:number) => Promise<IAnswer<IPosts | null  >>
    createPosts: (count:number,userId:number) => Promise<IAnswer<IPosts[]>>
    deletePost: (id:number,userId:number) => Promise<IAnswer<IPosts>>
    likePost: (postId:number,userId:number) => Promise<IAnswer<number[]>>
    unlikePost: (postId:number,userId:number) => Promise<IAnswer<number[]>>
    makeComment: (body:string, postId:number, userId:number) => Promise<IAnswer<Icommnet>>
}
export interface IControllerContract {
    getPostById: (
        req: Request<{id:string}, IPosts | string, object>,
        res: Response<string | IPosts | IPosts[] | null>,
    ) => void
    getAllPosts: (
        req:Request<object, IPosts[] | string, object, { take?: string, filter?: boolean, skip:string }>,
        res:Response<string | IPosts | IPosts[] | null>
    ) => void
    createUserPost: (
        req:Request<object, IPosts[] | string, IPostCreate>,
        res:Response<string | IPosts | IPosts[] | null,{userId:number}>
    ) => Promise<void>
    updateUserPost: (
        req:Request<{id:string}, IPosts | string, IPostUpdateAll>,
        res:Response<string | IPosts | IPosts[] | null,{userId:number}>
    ) => Promise<void>
    createPosts: (
        req:Request<object, IPosts[] | string, IcountBody>,
        res:Response<string | IPosts | IPosts[] | null,{userId:number}>
    ) => Promise<void>
    deletePost: (
        req:Request<{id:string}, IPosts[] | string, IPosts>,
        res:Response<string | IPosts | IPosts[] | null,{userId:number}>
    ) => Promise<void>
    likePost: (
        req:Request<{id:string},IPosts | string,object>,
        res:Response<IPosts  | string | number[] | null>
    ) => Promise<void>
    unlikePost: (
        req:Request<{id:string},string,object>,
        res:Response<IPosts  | string | number[] | null>
    ) => Promise<void>
    comment: (
        req:Request<{id:string},Icommnet | string,ICreatecommnet>,
        res:Response<Icommnet  | string | null>
    ) => Promise<void>
}

export interface IRepositoryContract {
    getPostById: (id:number) => Promise<IPostFull | null | string>
    getAllPosts: (getData:getData) => Promise<IPosts[]>
    createPostByUser: (posts:IPostCreate[],userId:number) => Promise<IPosts[]>
    updatePost: (id:number,postData:IPostUpdateAll) => Promise<IPosts | null>
    deletePost: (id:number) => Promise<IPosts | string>
    likePost: (postId:number,userId:number) => Promise<number[]>
    unlikePost: (postId:number,userId:number) => Promise<number[]>
    createComment: (body:string, postId:number, userId:number) => Promise<Icommnet>
    // createPosts: (count:number,userId:number) => Promise<IPosts[]>

    // addTagsToPost: (id:number,names:string[]) => Promise<IAnswer>
}
// export type IAnswero = IAnswer