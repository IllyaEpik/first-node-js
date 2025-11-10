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
export type UserSecurity = Prisma.UserGetPayload<{
    omit:{
        id:true,
        password:true
    }
}>
// export type UserLogin = Prisma.UserGetPayload<{
//     omit:{
//         id:true,
//         name:true
//     }
// }>
export type UserInput = UserWithoutId & {confirmPassword:string}
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
        req:Request<object, UserSecurity | string, UserInput>,
        res:Response<string | UserSecurity | null>
    ) => Promise<void>
    login: (
        req:Request<object, UserSecurity | string, UserLogin>,
        res:Response<string | UserSecurity | null>
    ) => Promise<void>
}

export interface IRepositoryContract {
    createUser: (user:UserWithoutId) => Promise<UserSecurity | null>
    getUser: (email:string) => Promise<IUser | null>
    
}
export interface IServiceContract {
    registation: (user:UserInput) => Promise<UserSecurity | null | string>
    login: (userData:UserLogin) => Promise<UserSecurity | null | string>

}