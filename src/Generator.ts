// import path from "path";
// import fs from "fs";
// import crypto from "crypto";
// import {generate} from "random-words";
// import { Users } from "./Users/types.ts";
// // const crypto  = require("crypto")
// // const randomWords = require('random-words')
// let imgList = [
//     "https://www.timeforkids.com/wp-content/uploads/2019/09/final-cover-forest.jpg?w=1024",
//     "https://upload.wikimedia.org/wikipedia/ru/f/f4/Minecraft_Cover_Art.png",
//     "https://www.exitlag.com/blog/wp-content/uploads/2024/12/How-to-build-a-cute-Minecraft-house_-materials-design-and-tips-to-create-your-world.webp",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaNYcBxd8JRW3HuLY5Gwoq0yRSZYmOxlH3Fw&s",
//     ""
// ]
// // function createPost(countPosts=10){
// //     array = []

// //     for (let count = 0; count<countPosts; count++){
// //         let object = {
// //             id: array.length+1,
// //             name: randomWords.generate(crypto.randomInt(2)+1).join(" "),
// //             description: randomWords.generate(crypto.randomInt(200)+10).join(" "),
// //             img: imgList[crypto.randomInt(5)],
// //             likes:crypto.randomInt(10000)
// //         }
// //         array.push(object)
// //     }
// //     fs.writeFileSync(
// //         path.join(__dirname+'/Posts/posts.json'),
// //         JSON.stringify(array,null,4)
// //     )
// //     return array
// // }
// function createUsers(countUsers=10):Users[]{
//     let array:Users[] = [] // <-- Initialize as empty array
//     for (let count = 0; count<countUsers; count++){
//         let password = generate(1)
//         let passwordNew;
//         // if (){
//         //     passwordNew = password.join(" ")
//         // }else{
//         //     passwordNew = password
//         // }
//         let object = {
//             id: array.length+1,
//             name: generate(crypto.randomInt(2)+1).join(" "),
//             password: (generate(1)).join(" "),
//             email: `${generate(1)}@gmail.com`
//         }
//         array.push(object)
//     }
//     console.log(path.join(__dirname+'/jsons/users.json'))
//     fs.writeFileSync(
//         path.join(__dirname+'/Posts/users.json'),
//         JSON.stringify(array,null,4)
//     )
//     return array
// }
// // createUsers(321)
// // export createUsers
// export default {
//     // "createPost":createPost, 
//     "createUsers":createUsers
// }