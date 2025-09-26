let moment = require("moment")()
let express = require("express")
let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let path = require("path")
let fs = require("fs")
createPost = require("./postGenerator.js")

const HOST = "127.0.0.1"
const PORT = 8888
let pathToJson = path.join(__dirname+"/posts.json")
app.get("/timestamp", (req,res) => {
    res.status(200).send({date: moment.format("y/D/M H:m:s")})
})
app.get("/posts", (req,res) => {
    let data = JSON.parse(fs.readFileSync(pathToJson,'utf-8'))
    let skip = 0
    let take = 999999
    let filter = !!req.query.filter
    if (!isNaN(Number(req.query.skip))){
        skip = Number(req.query.skip)
    }else if (req.query.skip){
        res.status(400).json("skip must be a number")
    }
    if (!isNaN(Number(req.query.take))){
        take = Number(req.query.take)
    }else if (req.query.take){
        res.status(400).json("take must be a number")
    }
    
    data = data.filter((item) => {
        if (skip>0){
            skip-- 
            return false;
        }
        if (take>0){
            if (filter){
                take-=item.name.includes("a")
                return item.name.includes("a")
            }
            take--
            return true;
        }
    })
    res.status(200).json(data)
})
app.post("/posts", (req,res) => {
    if (req.body){
        if ("count" in req.body){
            if (!isNaN(Number(req.body.count))){
                createPost(req.body["count"])
                let data = JSON.parse(fs.readFileSync(pathToJson,'utf-8'))
                res.status(200).json(data)
            }else{
                res.status(400).send("count must be number")
            }
        }else{
            res.status(400).send("body must have count of posts")
        }
    }else{
        res.status(400).send("request doesn't have body or server can't get body, try to set type of body 'raw'")
    }
    
})
app.get("/posts/:id", (req,res) => {
    const id = req.params.id
    let data = JSON.parse(fs.readFileSync(pathToJson,'utf-8'))
    for (let object of data){
        
        if (object.id == id) {
            res.status(200).json(object)

            return;
        }
        
    }
    console.log(123)
    res.status(400).send(`doesn't exists post with id ${id}`)
})
app.listen(PORT,HOST, () =>{ 
    console.log(`http://${HOST}:${PORT}`)
})