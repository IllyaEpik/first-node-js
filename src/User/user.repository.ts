

// import Prisma from "../db/prisma.ts";
import client from "../db/prismaClient.ts";
import type{IRepositoryContract, UserWithoutId } from "./user.types.ts";

const repositoryFunctions:IRepositoryContract={
    createUser: async (user:UserWithoutId)=> {
        const createdUser = await client.user.create({data:user})
        return createdUser
    },
    getUser: async (email) => {
        const user = await client.user.findUnique({
            where:{
                email:email
            }
        })
        return user
    }
}
export default repositoryFunctions