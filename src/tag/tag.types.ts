import Prisma from "../db/prisma.ts";
import type{ Response, Request } from "express";

export type ITags = Prisma.TagGetPayload<{
    // include:{
    //     post:true
    // }
}>
export interface getData {
    skip?:number,
    take?:number
}
export interface IAnswerMultiple{
    status: number,
    response: string | null | ITags[]
}
export interface IAnswer{
    status: number,
    response: string | null | ITags
}
export interface IServiceContract{
    getAll: (data:getData) => Promise<IAnswerMultiple>
    getById: (id:number) => Promise<IAnswer>
    create: (name:string[]) => Promise<IAnswerMultiple>
}
export interface IControllerContract{
    getAll: (
        req: Request<object,ITags[] | string, object, { take?: string, skip?:string}>,
        res: Response<string | ITags[] | null>,
    ) => Promise<void>
    getById: (
        req: Request<{id:string}, ITags | string, object>,
        res: Response<string | ITags | null>
    ) => Promise<void>
    create: (
        req: Request<object, ITags | string, string[] | string>,
        res: Response<string | ITags | null | ITags[]>
    ) => Promise<void>
}
export interface IRepositoryContract{
    getAll: (data:getData) => Promise<IAnswerMultiple>
    getById: (id:number) => Promise<IAnswer>
    create: (nameArray:string[]) => Promise<IAnswerMultiple>
}