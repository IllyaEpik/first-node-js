let moment = require("moment")()
let express = require("express")
let app = express()
app.use(require("express").json());
app.use(express.urlencoded({ extended: true }));

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
    res.status(200).json(data)
})
app.post("/posts", (req,res) => {
    if (req.body){
        if ("count" in req.body){
            if (!isNaN(Number(req.body.count))){
                createPost(req.body["count"])
                // res.status(200).send("update complete")
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
app.listen(PORT,HOST, () =>{ 
    console.log(`http://${HOST}:${PORT}`)
})