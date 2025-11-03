import type{ Response, Request } from "express";
import Prisma from "../db/prisma.ts";

// export interface IUsers {
//     id: Number,
//     name: String,
//     password: String,
//     email: String
// }
export type IUsers = Prisma.UserGetPayload<{
}>

// export type ITagsOnUsers = Prisma.TagsOnUsersGetPayload<{

// }>

export type IUserCreate = Prisma.UserUncheckedCreateInput
export type IUserUpdate = Prisma.UserUncheckedUpdateInput
export type IUserCreateChecked = Prisma.UserCreateInput
export type IUserUpdateChecked = Prisma.UserUpdateInput
export interface getData {
    skip?:number,
    take?:number
}
export interface IcountBody {
    count: number
}
export interface IAnswer {
    response:string | IUsers | IUsers[],
    status:number
}
export interface IServiceContract {
    getUserById: (id:number) => Promise<IAnswer>
    getAllUsers: (skip:String | undefined,take:String | undefined,filter:Boolean) => Promise<IAnswer>
    createUserUser: (body:IUserCreate) => Promise<IAnswer>
    updateUserUser: (id:number,body:IUserUpdate) => Promise<IAnswer>
    createUsers: (count:number,userId:number) => Promise<IAnswer>
    deleteUser: (id:number) => Promise<IAnswer>
}
export interface IControllerContract {
    getUserById: (
        req: Request<{id:string}, IUsers | string, object>,
        res: Response<string | IUsers | IUsers[] | null>,
    ) => void
    getAllUsers: (
        req:Request<object, IUsers[] | string, object, { take?: string, filter?: boolean, skip:string }>,
        res:Response<string | IUsers | IUsers[] | null>
    ) => void
    createUserUser: (
        req:Request<object, IUsers[] | string, IUserCreate>,
        res:Response<string | IUsers | IUsers[] | null>
    ) => Promise<void>
    updateUserUser: (
        req:Request<{id:string}, IUsers | string, IUserUpdate>,
        res:Response<string | IUsers | IUsers[] | null>
    ) => Promise<void>
    createUsers: (
        req:Request<object, IUsers[] | string, IcountBody>,
        res:Response<string | IUsers | IUsers[] | null>
    ) => Promise<void>
    deleteUser: (
        req:Request<{id:string}, IUsers[] | string, IUsers>,
        res:Response<string | IUsers | IUsers[] | null>
    ) => Promise<void>
    
}

export interface IRepositoryContract {
    getUserById: (id:number) => Promise<IUsers | null>
    getAllUsers: (getData:getData) => Promise<IUsers[]>
    createUserByUser: (users:IUserCreate[]) => Promise<IUsers[]>
    updateUser: (id:number,userData:IUserUpdate) => Promise<IUsers | null>
    // createUsers: (count:number) => Promise<IAnswer>
    deleteUser: (id:number) => Promise<IAnswer>
    getUserByName: (name:string) => Promise<IUsers | null>
}
export interface IServiceContract {
    getUserById: (id:number) => Promise<IUsers | null>
    getAllUsers: (getData:getData) => Promise<IUsers[]>
    createUserByUser: (users:IUserCreate[]) => Promise<IUsers[]>
    updateUser: (id:number,userData:IUserUpdate) => Promise<IUsers | null>
    // createUsers: (count:number) => Promise<IAnswer>
    deleteUser: (id:number) => Promise<IAnswer>
    getUserByName: (name:string) => Promise<IUsers | null>
}