import Prisma from "../db/prisma.ts";
import client from "../db/prismaClient.ts";
import type{IRepositoryContract } from "./tag.types.ts";

const repositoryFunctions:IRepositoryContract = {
    getAll: async (data) => {
        try{
            const tags = await client.tag.findMany(data)
            return {
                status:200,
                response:tags
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                return {
                    status: 404,
                    response: `tags aren't found`
                }
            }
            return {
                response:String(error),
                status:404
            }
        }
    },
    getById: async (id) => {
        try {
            const tag = await client.tag.findUnique({ where:{id:id} })
            return {
                response:tag,
                status:200
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                return {
                    status: 404,
                    response: `tag with id ${id} is not found`
                }
            }
            return {
                response:String(error),
                status:404
            }
        }
        
    }
}
export default repositoryFunctions