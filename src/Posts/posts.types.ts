import type{ Response, Request } from "express";
export interface IPosts {
    id: number;
    name: string;
    description: string;
    img: string | null;
    likes: number;
}
export type IPostCreate = Omit<IPosts,"id">
export type IPostUpdate = Partial<Omit<IPosts,"id">>
export interface getData {
    skip?:number,
    take?:number
}
export interface IcountBody {
    count: number
}
export interface IAnswer {
    response: string | IPosts | IPosts[],
    status: number
} 
export interface IServiceContract {
    getPostById: (id:number) => Promise<IAnswer>
    getAllPosts: (skip:String | undefined,take:String | undefined,filter:Boolean) => Promise<IAnswer>
    createUserPost: (body:IPostCreate) => Promise<IAnswer>
    updateUserPost: (id:number,body:IPostUpdate) => Promise<IAnswer>
    createPosts: (count:number) => Promise<IAnswer>
}
export interface IControllerContract {
    getPostById: (
        req: Request<{id:string}, IPosts | string, object>,
        res: Response<string | IPosts | IPosts[]>,
    ) => void
    getAllPosts: (
        req:Request<object, IPosts[] | string, object, { take?: string, filter?: boolean, skip:string }>,
        res:Response<string | IPosts | IPosts[]>
    ) => void
    createUserPost: (
        req:Request<object, IPosts[] | string, IPostCreate>,
        res:Response<string | IPosts | IPosts[]>
    ) => Promise<void>
    updateUserPost: (
        req:Request<{id:string}, IPosts | string, IPostUpdate>,
        res:Response<string | IPosts | IPosts[]>
    ) => Promise<void>
    createPosts: (
        req:Request<object, IPosts[] | string, IcountBody>,
        res:Response<string | IPosts | IPosts[]>
    ) => Promise<void>
}
// export type IAnswero = IAnswer