import path from "path";
import fs from "fs";
import crypto from "crypto";
import {generate} from "random-words";
import type{ IUsers } from "./Users/users.types.ts";
import type{ IPostCreate } from "./Posts/posts.types.ts";
// import type{ ITagCreate } from "./Posts/posts.types.ts"; /
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const editor = (count:number):string => {
    
    let data:string | string[] = generate(count)
    if (Array.isArray(data)){
        return data.join(" ")
    }
    
    return data
}
const imgList:string[] = [
    "https://www.timeforkids.com/wp-content/uploads/2019/09/final-cover-forest.jpg?w=1024",
    "https://upload.wikimedia.org/wikipedia/ru/f/f4/Minecraft_Cover_Art.png",
    "https://www.exitlag.com/blog/wp-content/uploads/2024/12/How-to-build-a-cute-Minecraft-house_-materials-design-and-tips-to-create-your-world.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaNYcBxd8JRW3HuLY5Gwoq0yRSZYmOxlH3Fw&s",
    ""
]
function createPost(countPosts=10,userId:number):IPostCreate[]{
    const array:IPostCreate[] = []

    for (let count = 0; count<countPosts; count++){
        const object:IPostCreate = {
            name: editor(crypto.randomInt(2)+1),
            description: editor(crypto.randomInt(200)+10),
            img: String(imgList[crypto.randomInt(5)]),
            likes:crypto.randomInt(10000),
            userId:userId
        }
        array.push(object)
    }
    return array
}
function createTag(){

}
function createUsers(countUsers=10):IUsers[]{
    const array:IUsers[] = []
    for (let count = 0; count<countUsers; count++){
        let object = {
            id: array.length+1,
            name: editor(crypto.randomInt(2)+1),
            password: editor(1),
            email: `${editor(1)}@gmail.com`
        }
        array.push(object)
    }
    console.log(path.join(__dirname+'/jsons/users.json'))
    fs.writeFileSync(
        path.join(__dirname+'/Posts/users.json'),
        JSON.stringify(array,null,4)
    )
    return array
}
// createUsers(321)
// export createUsers

export default {
    "createPost":createPost, 
    "createUsers":createUsers
}