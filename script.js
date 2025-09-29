let moment = require("moment")()
let express = require("express")

let [getPostById,getAllPosts,createPosts] = require('./posts.js')
let [createUsersMany,getUserById] = require('./users.js')

let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const HOST = "127.0.0.1"
const PORT = 8888
app.get("/timestamp", (req,res) => {
    res.status(200).send({date: moment.format("y/D/M H:m:s")})
})
app.get("/posts/:id", getPostById)
app.get("/posts", getAllPosts)
app.post("/users", createUsersMany)
app.post("/users/:id", getUserById)

app.post("/posts", createPosts)
app.listen(PORT,HOST, () =>{ 
    console.log(`http://${HOST}:${PORT}`)
})