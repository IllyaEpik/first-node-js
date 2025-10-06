let path = require("path")
let fs = require("fs")
let fsPromises = require("fs/promises")

const pathToJson = path.join(__dirname+"/posts.json")
const {createPost} = require("../Generator.js")
console.log(pathToJson)
let allPostsJson = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));

const postsMethods = {
    getPostById: (id) => {
        const object = allPostsJson.find(object => object.id == id)
        // if post with id is undefined
        if (!object){
            return {
                status:400,
                response: `doesn't exists post with id ${id}`
            };
        }
        return {
                status:200,
                response: object
            }
    },

    getAllPosts: (skip,take,filter) => {
            
            let localPosts = [ ...allPostsJson ]
            // if filter isn't undefined and it is true
            if (filter){
                localPosts = localPosts.filter(object => object.name.includes("a"))
            }
            // if skip isn't undefined 
            if (skip){
                skip = Number(skip)
                // if take isn't a number
                if (isNaN(skip)){
                    return {
                        status:400,
                        response: "skip must be a number"
                    }
                }
                localPosts.splice(0,skip)
            }
            // if take isn't undefined 
            if (take){
                take = Number(take)
                // if take isn't a number
                if (isNaN(take)){
                    return {
                        status:400,
                        response: "take must be a number"
                    }
                }
                localPosts.splice(take,localPosts.length-take)
            }
            return {
                status:200,
                response: localPosts
            }
    },
    createUserPost: async (body) => {
        try {
            // if server can't get body or user didn't indicate body in request
            if (!body){
                return {
                        status: 422,
                        response: "request must have body"
                }
            }
            let listOfRequests = [body]
            // if user want to create many posts
            if (Array.isArray(body)){
                listOfRequests = body
            }
            let newId = allPostsJson.length+1
            for (let item of listOfRequests){
                // if user didn't indicate name for post
                if (!item.name){
                    return {
                        status: 422,
                        response: "request must have name"
                    }
                }
                // if user didn't indicate description for post
                if (!item.description){
                    return {
                        status: 422,
                        response: "request must have description"
                    }
                }
                // if user didn't indicate img for post
                if (!item.img){
                    return {
                        status: 422,
                        response: "request must have img"
                    }
                }
                item.id = newId;
                newId++
            }
            // joining arrays
            allPostsJson = await allPostsJson.concat(listOfRequests)
            await fsPromises.writeFile(pathToJson, JSON.stringify(allPostsJson,null,4))
            return {
                status: 200,
                response: allPostsJson
            }
        } catch (error) {
            return {
                status: 500,
                response: error
            }
        }
    },
    createPosts: async (body) => {
        try {
            // if server can't get body or user didn't indicate body in request
            if (!body){
                return {
                    status: 422,
                    response: "request doesn't have body or server can't get body, try to set type of body 'raw' or 'x-www-form-urlencoded'"
                };
            }
            // if user didn't indicate count in body
            if (!body.count){
                return {
                    status: 422,
                    response: "body must have count of posts"
                };
            }
            let count = Number(body.count)
            // if count isn't a number
            if (isNaN(count)){
                return {
                    status: 422,
                    response: "count must be number"
                };
            }
            // if count is too big
            if (count>1000){

                return {
                    status: 422,
                    response: "count too big, count must be smaller than 1000"
                };
            }
            
            await createPost(body["count"])
            allPostsJson = JSON.parse(await fsPromises.readFile(pathToJson, "utf-8"))
            return {
                    status: 200,
                    response: allPostsJson
                };
            
        } catch (error) {
           return {
                    status: 500,
                    response: error
                }
        }
    }
}

module.exports = postsMethods