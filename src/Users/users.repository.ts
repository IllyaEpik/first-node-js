

import Prisma from "../db/prisma.ts";
import client from "../db/prismaClient.ts";
import type{IRepositoryContract } from "./users.types.ts";

const repositoryFunctions:IRepositoryContract={
    getAllUsers:async (getData) =>{
        const users = await client.user.findMany(getData)
        return users
    },
    getUserById: async (id) => {
        const user = await client.user.findUnique({
            where:{id:id}
        })
        return user
    },
    createUserByUser: async (users) => {
        const batch = await client.user.createMany({
            data:users
        })
        const countOfPosts = await client.user.count()-batch.count
        return await repositoryFunctions.getAllUsers({
            skip:countOfPosts,
            take:batch.count
        })
    },
    updateUser: async (id,postData) => {    
        return await client.user.update({
            where:{id:id},
            data:postData
        })
    },
    getUserByName: async (name) => {
        const user = await client.user.findFirst({
            where:{name}
        })
        return user
    },
    deleteUser: async (id) => {    
        try {
            const user = await client.user.delete({
                where:{id:id}
            })
            return {
                status: 200,
                response: user
            }
        }
        
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                return {
                    status: 404,
                    response: `post with id ${id} is not found`
                }
            }
            return {
                status: 404,
                response: String(error)
            }
        }
        
    }

}
export default repositoryFunctions