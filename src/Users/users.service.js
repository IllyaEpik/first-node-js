let path = require("path")
let fs = require("fs")
let fsPromises = require("fs/promises")

// let [createPost, createUsers] = require("./Generator.js")
const pathToJson = path.join(__dirname+"/users.json")
const {createUsers} = require("../Generator.js")

let allUsersJson = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));

const usersMethods = {
    getUserByName: async (name) => {
        try {
            
            // if request doesn't have name
            if (!name){
                return {
                    status: 422,
                    response:"server can't get name"
                }
            }
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
                    response:error
                }
        }
    },
    getUserById: async (id,fields) => {
        try {
            const object = await allUsersJson.find(object => object.id == id)
            let validObject = object
            // if user with id is undefined
            if (!object){
                return {
                        status:422,
                        response:`doesn't exists user with id ${id}`
                    };
            }
            // if user didn't indicate fields in request
            if (fields){
                validObject = {}
                fields = fields.split(",")
                const check = async (field) => {
                    return await fields.includes(field) ? validObject[field] = object[field] : false
                }
                // if request don't have these fields
                if (await !check("name") && await !check("email") && await !check('password')){
                    return {
                        status:422,
                        response:`fields are undefined, write correct names of fields, exemple: ?fields=name,email,password`
                    };
                }
            }
            return {
                        status:200,
                        response:validObject
                    };            
        } catch (error) {
            return {
                        status:500,
                        response:error
                    };
        }
    },
    createUsersMany: async (body) => {
    try {
        // if server can't get body or user didn't indicate body in request
        if (!body){
            return {
                status:422,
                response: "request doesn't have body or server can't get body, try to set type of body 'raw' or ''"
            };
        }
        // if user didn't indicate count in body
        if (!body.count){
            return {
                status:422,
                response: "body must have count of posts"
            };
        }
        let count = Number(body.count)
        // if count isn't a number
        if (isNaN(count)){
            return {
                status:422,
                response: "count must be number"
            };
        }
        // if count is too big
        if (count>1000){
            return {
                status:422,
                response:"count too big, count must be smaller than 1000"
            };
        }
        await createUsers(count)
        allUsersJson = JSON.parse(await fsPromises.readFile(pathToJson, "utf-8"))
        return {
                status:200,
                response:allUsersJson
            };
        
    } catch (error) {
        return {
            status:500,
            response:error
        };
    }
}
}

module.exports = usersMethods