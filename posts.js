let path = require("path")
let fs = require("fs")
let fsPromises = require("fs/promises")

let [createPost, createUsers] = require("./Generator.js")
let pathToJson = path.join(__dirname+"/jsons/posts.json")
let allPostsJson = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));
const getPostById = async (req,res) => {
    try {
        const id = req.params.id
        const object = await allPostsJson.find(object => object.id == id)
        // if post with id is undefined
        if (!object){
            await res.status(422).send(`doesn't exists post with id ${id}`)
            return;
        }
        await res.status(200).json(object)
    } catch (error) {
        await res.status(500).send(error)
    }
}
const getAllPosts = async (req,res) => {
    try {
        let skip = req.query.skip
        let take = req.query.take
        let filter = req.query.filter
        let localPosts = [ ...allPostsJson ]
        // if filter isn't undefined and it is true
        if (filter){
            localPosts = await localPosts.filter(object => object.name.includes("a"))
        }
        // if skip isn't undefined 
        if (skip){
            skip = Number(skip)
            // if take isn't a number
            if (isNaN(skip)){
                await res.status(422).json("skip must be a number")
            }
            await localPosts.splice(0,skip)
        }
        // if take isn't undefined 
        if (take){
            take = Number(take)
            // if take isn't a number
            if (isNaN(take)){
                await res.status(422).json("take must be a number")
            }
            await localPosts.splice(take,localPosts.length-take)
        }
        await res.status(200).json(localPosts)
    } catch (error) {
        await res.status(500).send(error)
    }
}
const createPosts = async (req,res) => {
    try {
        // if server can't get body or user didn't indicate body in request
        if (req.body == undefined){
            await res.status(422).send("request doesn't have body or server can't get body, try to set type of body 'raw' or ''")
            return;
        }
        // if user didn't indicate count in body
        if (!req.body.count){
            await res.status(422).send("body must have count of posts")
            return;
        }
        let count = Number(req.body.count)
        // if count isn't a number
        if (isNaN(count)){
            await res.status(422).send("count must be number")
            return;
        }
        // if count is too big
        if (count>1000){
            await res.status(422).send("count too big, count must be smaller than 1000")
            return;
        }
        
        await createPost(req.body["count"])
        allPostsJson = JSON.parse(fs.readFileSync(pathToJson,'utf-8'))
        await res.status(200).json(allPostsJson)
        
    } catch (error) {
       await res.status(500).send(error)
    }
}
const createUserPost = async (req,res) => {
    try {
        // if server can't get body or user didn't indicate body in request
        if (!req.body){
            await res.status(422).send("request must have body")
            return;
        }
        let listOfRequests = [req.body]
        // if user want to create many posts
        if (typeof req.body == typeof []){
            listOfRequests = req.body
        }
        let newId = allPostsJson.length+1
        for (let item of listOfRequests){
            // if user didn't indicate name for post
            if (!item.name){
                await res.status(422).send("request must have name");
                return;
            }
            // if user didn't indicate description for post
            if (!item.description){
                await res.status(422).send("request must have description")
                return;
            }
            // if user didn't indicate img for post
            if (!item.img){
                await res.status(422).send("request must have img")
                return;
            }
            item.id = newId;
            newId++
        }
        // joining arrays
        allPostsJson = await allPostsJson.concat(listOfRequests)
        await fsPromises.writeFile(pathToJson, await JSON.stringify(allPostsJson,null,4))
        await res.status(200).json(allPostsJson)
    } catch (error) {
        await res.status(500).send(error)
    }
    


}
module.exports = [getPostById,getAllPosts,createPosts,createUserPost]