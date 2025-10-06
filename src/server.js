const express = require("express")
const postsRouter = require("./Posts/posts.router")
const UsersRouter = require("./Users/users.router")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/post",postsRouter)
app.use("/users",UsersRouter)
const HOST = "127.0.0.1"
const PORT = 8888

app.listen(PORT,HOST, () =>{ 
    console.log(`http://${HOST}:${PORT}`)
})