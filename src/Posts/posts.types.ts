import type{ Response, Request } from "express";
import Prisma from "../db/prisma.ts";

export type IPosts = Prisma.PostGetPayload<{
    // include:{
    //     tags:true
    // }
}>
export type IPostsWithTags = Prisma.PostGetPayload<{
    include:{
        tags:true
    }
}>
export type ITagsOnPosts = Prisma.TagsOnPostsGetPayload<{

}>

export type IPostCreate = Prisma.PostUncheckedCreateInput
export type IPostUpdate = Prisma.PostUncheckedUpdateInput

export type IPostCreateChecked = Prisma.PostCreateInput
export type IPostUpdateChecked = Prisma.PostUpdateInput
export interface getData {
    skip?:number,
    take?:number
}
export interface IcountBody {
    count: number
}
export interface IAnswer {
    response: string | IPosts | IPosts[] | null,
    status: number
} 
export interface IServiceContract {
    getPostById: (id:number) => Promise<IAnswer>
    getAllPosts: (skip:String | undefined,take:String | undefined,filter:Boolean) => Promise<IAnswer>
    createUserPost: (body:IPostCreate) => Promise<IAnswer>
    updateUserPost: (id:number,body:IPostUpdate) => Promise<IAnswer>
    createPosts: (count:number,userId:number) => Promise<IAnswer>
    deletePost: (id:number) => Promise<IAnswer>
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
        res:Response<string | IPosts | IPosts[] | null>
    ) => Promise<void>
    updateUserPost: (
        req:Request<{id:string}, IPosts | string, IPostUpdate>,
        res:Response<string | IPosts | IPosts[] | null>
    ) => Promise<void>
    createPosts: (
        req:Request<object, IPosts[] | string, IcountBody>,
        res:Response<string | IPosts | IPosts[] | null>
    ) => Promise<void>
    deletePost: (
        req:Request<{id:string}, IPosts[] | string, IPosts>,
        res:Response<string | IPosts | IPosts[] | null>
    ) => Promise<void>
    
}

export interface IRepositoryContract {
    getPostById: (id:number) => Promise<IPosts | null>
    getAllPosts: (getData:getData) => Promise<IPosts[]>
    createPostByUser: (posts:IPostCreate[]) => Promise<IPosts[]>
    updatePost: (id:number,postData:IPostUpdate) => Promise<IPosts | null>
    // createPosts: (count:number) => Promise<IAnswer>
    deletePost: (id:number) => Promise<IAnswer>
    // addTagsToPost: (id:number,names:string[]) => Promise<IAnswer>
}
// export type IAnswero = IAnswer