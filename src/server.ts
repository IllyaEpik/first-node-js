import postsRouter from "./Posts/posts.router.ts";
import UsersRouter from "./User/user.router.ts";
import tagRouter from "./tag/tag.router.ts";
import express from "express";
import type { Express } from "express"; 
import cors from "cors";
const app:Express = express()
app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/posts",postsRouter)
app.use("/tags",tagRouter)
app.use("/users",UsersRouter)
const HOST = "127.0.0.1"
const PORT = 8888

app.listen(PORT,HOST, () =>{ 
    console.log(`http://${HOST}:${PORT}`)
})