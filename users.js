let path = require("path")
let fs = require("fs")
let [s,createUsers] = require("./Generator.js")
// const { Certificate } = require("crypto")
let pathToJson = path.join(__dirname+"/jsons/users.json")
let allUsersJson = JSON.parse(fs.readFileSync(pathToJson,'utf-8'))
const createUsersMany = (req,res) => {
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
    createUsers(count)
    allUsersJson = JSON.parse(fs.readFileSync(pathToJson,'utf-8'))
    res.status(200).json(allUsersJson)
}
const getUserById = (req,res) => {
    const id = req.params.id
    const object = allUsersJson.find(object => object.id == id)
    let fields = req.query.fields
    const validObject = {}
    const check = (field) => {
        return fields.includes(field) ? validObject[field] = object[field] : false
    }
    if (!object){
        res.status(400).send(`doesn't exists user with id ${id}`)
        return;
    }
    if (!fields){
        res.status(200).json(object)
        return;
    }
    fields = fields.split(",")

    if (!check("name") && !check("email") && !check('password')){
        res.status(400).send(`fields are undefined, write correct names of fields, exemple: ?fields=name,email,password`)
        return
    }
    res.status(200).json(validObject)
}
module.exports = [createUsersMany,getUserById]