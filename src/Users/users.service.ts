// let path = require("path")
// let fs = require("fs")

// import path from "path";
// import fs from "fs";
import type {IAnswer, IUsers,IServiceContract, IUserCreate} from "./users.types.ts";
import repository from "./users.repository.ts";


// let allUsersJson:IUsers[] = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));

const usersMethods:IServiceContract = {
    getUserById: async (id) => {
        // const object = allUsersJson.find(object => object.id == id)
        const object = await repository.getUserById(id);
        // if user with id is undefined
        if (!object){
            return {
                status:400,
                response: `doesn't exists user with id ${id}`
            };
        }
        return {
                status:200,
                response: object
            }
    },

    getAllUsers: async (skip,take,filter) => {
            
            
            // if skip isn't undefined 
            const gottenData:getData = {

            }
            if (skip){
                let skipNumber = Number(skip)
                // if take isn't a number
                if (isNaN(skipNumber)){
                    return {
                        status:400,
                        response: "skip must be a number"
                    }
                }
                gottenData.skip = skipNumber
                // localUsers.splice(0,skipNumber)
            }
            // if take isn't undefined 
            if (take){
                let takeNumber = Number(take)
                // take = Number(take)
                // if take isn't a number
                if (isNaN(takeNumber)){
                    return {
                        status:400,
                        response: "take must be a number"
                    }
                }
                gottenData.take = takeNumber
                // localUsers.splice(takeNumber,localUsers.length-takeNumber)
            }
            let localUsers:IUsers[] = await repository.getAllUsers(gottenData)
            // if filter isn't undefined and it is true
            if (filter){
                localUsers = localUsers.filter(object => object.name.includes("a"))
            }
            return {
                status:200,
                response: localUsers
            }
    },
    createUser: async (body) => {
        try {
            
            let listOfRequests = [body]
            // if user want to create many users
            if (Array.isArray(body)){
                listOfRequests = body
            }
            for (const item of listOfRequests){
                // if user didn't indicate name for user
                if (!item.name && item.name.trim() === ""){
                    return {
                        status: 422,
                        response: "request must have name"
                    }
                }
                // if user didn't indicate description for user
                if (!item.description && item.description!=""){
                    return {
                        status: 422,
                        response: "request must have description"
                    }
                }
                // if user didn't indicate img for user
                if (item.img != null && typeof item.img != "string"){
                    return {
                        status: 422,
                        response: "request must have img"
                    }
                }
            }
            await repository.createUserByUser(listOfRequests)
            return {
                status: 200,
                response: await repository.getAllUsers({})
            }
        } catch (error:unknown) {
            return {
                status: 500,
                response: String(error)
            }
        }
    },
    updateUser: async (id,body:IUserUpdate) => {
        try{
            const user = await repository.updateUser(id,body)
            // await fsPromises.writeFile(pathToJson, JSON.stringify(allUsersJson,null,4))
            return {
                response:user,
                status:200
            }
        }catch(error:unknown){
            return {
                response:String(error),
                status:500
            }
        }
        
    },
    // createUsers: async (count,userId) => {
    //     try {
    //         const usersData:IUserCreate[] = await create.createUser(count,userId)
    //         const users:IUsers[] = await repository.createUserByUser(usersData)
    //         // allUsersJson = JSON.parse(await fsPromises.readFile(pathToJson, "utf-8"))
    //         return {
    //                 status: 200,
    //                 response: users
    //             };
    //     } catch (error) {
    //        return {
    //                 status: 500,
    //                 response: String(error)
    //             }
    //     }
    // },
    deleteUser: async (id) => {
        try{
            const user = await repository.deleteUser(id)
            return user
        }catch(error:unknown){
            return {
                response:String(error),
                status:500
            }
        }
        
    }
}

export default usersMethods