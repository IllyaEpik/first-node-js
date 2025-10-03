let moment = require("moment")()
let express = require("express")

let [getPostById,getAllPosts,createPosts,createUserPost] = require('./posts.js')
let [createUsersMany,getUserById,getUserByName] = require('./users.js')

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
app.get("/users/name/:name", getUserByName)

app.get("/users/:id", getUserById)
app.post("/posts/update", createPosts)
app.post("/posts/create", createUserPost)
app.listen(PORT,HOST, () =>{ 
    console.log(`http://${HOST}:${PORT}`)
})