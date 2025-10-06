let path = require("path")
let fs = require("fs")
let [s,createUsers] = require("./Generator.js")
let pathToJson = path.join(__dirname+"/jsons/users.json")
let allUsersJson = JSON.parse(fs.readFileSync(pathToJson,'utf-8'))
const createUsersMany = async (req,res) => {
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
        await createUsers(count)
        allUsersJson = JSON.parse(fs.readFileSync(pathToJson,'utf-8'))
        await res.status(200).json(allUsersJson)
        
    } catch (error) {
        await res.status(500).send(error)
    }
}
const getUserById = async (req,res) => {
    try {
        const id = req.params.id
        const object = await allUsersJson.find(object => object.id == id)
        let fields = req.query.fields
        let validObject = object
        // if user with id is undefined
        if (!object){
            await res.status(422).send(`doesn't exists user with id ${id}`)
            return;
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
                await res.status(422).send(`fields are undefined, write correct names of fields, exemple: ?fields=name,email,password`)
                return;
            }
        }
        await res.status(200).json(validObject)
        
    } catch (error) {
        await res.status(500).send(error)
    }
}
const getUserByName = async (req,res) => {
    try {
        const name = req.params.name
        // if request doesn't have name
        if (!name){
            await res.status(422).send("server can't get name")
            return
        }
        const object = allUsersJson.filter(object => object.name == name)
        // if user with name from request doesn't exists
        if (!object){
            await res.status(422).send(`users with name ${name} doesn't exist`)
            return
        }
        await res.status(200).json(object)
        
    } catch (error) {
        await res.status(500).send(error)
    }
}
module.exports = [createUsersMany,getUserById,getUserByName]