// let path = require("path")
// let fs = require("fs")

import path from "path";
import fs from "fs";
import type {IAnswer, IUsers} from "./users.types.ts";
import { fileURLToPath } from "url";
// import fsPromises from "fs/promises";
// Body

// let [createPost, createUsers] = require("./Generator.js")
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToJson = path.join(__dirname+"/users.json")
console.log(pathToJson)
// import { createUsers } from "../Generator.js";
// const {createUsers} = require("../Generator.js")


let allUsersJson:IUsers[] = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));

const usersMethods = {
    getUserByName: async (name:String): Promise<IAnswer>  => {
        try {
            
            
            
            const object = allUsersJson.filter(object => object.name == name)
            // if user with name from request doesn't exists
            if (!object){
                return {
                    status: 422,
                    response:`users with name ${name} doesn't exist`
                }
            }
            return {
                    status: 200,
                    response:object
                }
            
        } catch (error) {
            return {
                    status:500,
                    response:String(error)
                }
        }
    },
    getUserById:  (id:Number,fields?:String | undefined): IAnswer => {
        

        try {
            
            let validObject = allUsersJson.find(object => object.id == id)
            // let validObject = object
            // if user with id is undefined
            if (validObject==undefined){
                return {
                        status:422,
                        response:`doesn't exists user with id ${id}`
                    };
            }

            // if user didn't indicate fields in request
            if (fields){
                // console.log(fields)
                let fieldsArray:String[] = fields.split(",")
                let func = (field:keyof IUsers) => {
                    let include:boolean = fieldsArray.includes(field)
                    console.log(include,field)
                    if (!include){
                        delete validObject[field]
                    }
                    return include
                }
                let name = func("name")
                let email = func("email")
                let password = func("password")
                if (!name && !email && !password)
                    return {
                        status:422,
                        response:`fields are undefined, write correct names of fields, exemple: ?fields=name,email,password`
                    };
                // }
            }
            return {
                        status:200,
                        response:validObject
                    };            
        } catch (error : unknown) {
            return {
                status:500,
                response:String(error)
            };
        }
    },
//     createUsersMany: async (body:Body) => {
//     try {
//         // if server can't get body or user didn't indicate body in request
//         if (!body){
//             return {
//                 status:422,
//                 response: "request doesn't have body or server can't get body, try to set type of body 'raw' or ''"
//             };
//         }
//         // if user didn't indicate count in body
//         if (!body.count){
//             return {
//                 status:422,
//                 response: "body must have count of posts"
//             };
//         }
//         let count = Number(body.count)
//         // if count isn't a number
//         if (isNaN(count)){
//             return {
//                 status:422,
//                 response: "count must be number"
//             };
//         }
//         // if count is too big
//         if (count>1000){
//             return {
//                 status:422,
//                 response:"count too big, count must be smaller than 1000"
//             };
//         }
//         await createUsers(count)
//         allUsersJson = JSON.parse(await fsPromises.readFile(pathToJson, "utf-8"))
//         return {
//                 status:200,
//                 response:allUsersJson
//             };
        
//     } catch (error) {
//         return {
//             status:500,
//             response:error
//         };
//     }
// }
}

export default usersMethods