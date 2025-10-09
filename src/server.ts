import postsRouter from "./Posts/posts.router.ts";
import UsersRouter from "./Users/users.router.ts";
import express from "express";
import type { Express } from "express"; 
const app:Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/posts",postsRouter)
app.use("/users",UsersRouter)
const HOST = "127.0.0.1"
const PORT = 8888

app.listen(PORT,HOST, () =>{ 
    console.log(`http://${HOST}:${PORT}`)
})