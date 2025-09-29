let path = require("path")
let fs = require("fs")
let [createPost, createUsers] = require("./Generator.js")
let pathToJson = path.join(__dirname+"/jsons/posts.json")
let allPostsJson = JSON.parse(fs.readFileSync(pathToJson,'utf-8'))
const getPostById = (req,res) => {
    const id = req.params.id
    const object = allPostsJson.find(object => object.id == id)
    if (object){
        res.status(200).json(object)
        return;
    }
    res.status(400).send(`doesn't exists post with id ${id}`)
}
const getAllPosts = (req,res) => {
    let skip = req.query.skip
    let take = req.query.take
    let filter = req.query.filter
    let localPosts = [ ...allPostsJson ]
    if (filter){
        localPosts = localPosts.filter(object => object.name.includes("a"))
    }
    if (skip){
        skip = Number(skip)
        if (isNaN(skip)){
            res.status(400).json("skip must be a number")
        }
        localPosts.splice(0,skip)
    }
    if (take){
        take = Number(take)
        if (isNaN(take)){
            res.status(400).json("take must be a number")
        }
        localPosts.splice(take,localPosts.length-take)
    }
    
    res.status(200).json(localPosts)
}
const createPosts = (req,res) => {
    if (req.body == undefined){
        res.status(400).send("request doesn't have body or server can't get body, try to set type of body 'raw' or ''")
        return;
    }
    if (!req.body.count){
        res.status(400).send("body must have count of posts")
        return;
    }
    let count = Number(req.body.count)
    if (isNaN(count)){
        res.status(400).send("count must be number")
        return;
    }
    if (count>1000){
        res.status(400).send("count too big, count must be smaller than 1000")
        return;
    }
    createPost(req.body["count"])
    allPostsJson = JSON.parse(fs.readFileSync(pathToJson,'utf-8'))
    res.status(200).json(allPostsJson)
}
module.exports = [getPostById,getAllPosts,createPosts]