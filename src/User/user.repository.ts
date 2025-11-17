

import { hash } from "bcryptjs";
import Prisma from "../db/prisma.ts";
import client from "../db/prismaClient.ts";
import type{IRepositoryContract } from "./user.types.ts";

const repositoryFunctions:IRepositoryContract={
    
    createUser: async (user)=> {
        try {
            // const 
            user.password = await hash(user.password,10)
            const createdUser = await client.user.create({data:user})
            return createdUser
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch(error.code) {
                    case "P2002":
                        console.log("Unique constraint violation - email already exists")
                        break
                    case "P2024":
                        console.log("Connection pool timeout")
                        break
                    case "P2025":
                        console.log("user not found")
                        break
                    default:
                        console.log(`Database error: ${error.code}`)
                }
            }
            throw error
        }
    },
    getUser: async (email) => {
        try {
            
            const user = await client.user.findUnique({
                where:{
                    email:email
                }
            })
            return user
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch(error.code) {
                    case "P2024":
                        console.log("Connection pool timeout")
                        break
                    case "P2025":
                        console.log("User not found")
                        break
                    default:
                        console.log(`Database error: ${error.code}`)
                }
            }
            throw error
        }
    },
    getUserById: async (id) => {
        try {
            console.log(id)
            const user = await client.user.findUnique({
                where:{
                    id:id
                },
                omit:{
                    password:true
                }
            })
            return user
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch(error.code) {
                    case "P2024":
                        console.log("Connection pool timeout")
                        break
                    case "P2025":
                        console.log("User not found")
                        break
                    default:
                        console.log(`Database error: ${error.code}`)
                }
            }
            throw error
        
    }
    }
}
export default repositoryFunctions