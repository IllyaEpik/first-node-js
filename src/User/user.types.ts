import type{ Response, Request } from "express";
import Prisma from "../db/prisma.ts";

// export interface IUsers {
//     id: Number,
//     name: String,
//     password: String,
//     email: String
// }
export type IUser = Prisma.UserGetPayload<{
}>
export type UserWithoutId = Prisma.UserGetPayload<{
    omit:{
        id:true
    }
}>
export type UserCreate = Prisma.UserUncheckedCreateInput
export type UserSecurity = Prisma.UserGetPayload<{
    omit:{
        id:true,
        password:true
    }
}>
export type UserSecurityWithId = Prisma.UserGetPayload<{
    omit:{
        password:true
    }
}>
export interface IJWT{
    id:number
}
// export type UserLogin = Prisma.UserGetPayload<{
//     omit:{
//         id:true,
//         name:true
//     }
// }>
// export type UserInput = UserWithoutId & {confirmPassword:string}
export type UserLogin = Omit<UserWithoutId,"name">
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
    response:string | IUser,
    status:number
}
export interface IAnswerMultiple {
    response:string | IUser[],
    status:number
}

export interface IControllerContract {
    registation: (
        req:Request<object, UserSecurity | string, UserCreate>,
        res:Response<string | UserSecurity | null>
    ) => Promise<void>
    login: (
        req:Request<object, UserSecurity | string, UserLogin>,
        res:Response<string | UserSecurity | null>
    ) => Promise<void>
    me: (
        req:Request<object, UserSecurity | string, object>,
        res:Response<string | UserSecurity | null, {userId:number}>
    ) => Promise<void>
    checkAndSend: (
        data:string | UserSecurity | null,
        res:Response<string | UserSecurity | null>,
    ) => Promise<void>
}

export interface IRepositoryContract {
    createUser: (user:UserCreate) => Promise<UserSecurityWithId | null>
    getUser: (email:string) => Promise<IUser | null>
    getUserById: (id:number)=> Promise<UserSecurityWithId | null>
    
}
export interface IServiceContract {
    registation: (user:UserCreate) => Promise<string>
    login: (userData:UserLogin) => Promise<string>
    me: (id:number) => Promise<UserSecurity | null | string>
}