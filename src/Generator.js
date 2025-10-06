let path = require("path")
let fs = require("fs")
const crypto  = require("crypto")
const randomWords = require('random-words')
let imgList = [
    "https://www.timeforkids.com/wp-content/uploads/2019/09/final-cover-forest.jpg?w=1024",
    "https://upload.wikimedia.org/wikipedia/ru/f/f4/Minecraft_Cover_Art.png",
    "https://www.exitlag.com/blog/wp-content/uploads/2024/12/How-to-build-a-cute-Minecraft-house_-materials-design-and-tips-to-create-your-world.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaNYcBxd8JRW3HuLY5Gwoq0yRSZYmOxlH3Fw&s",
    ""
]
function createPost(countPosts=10){
    array = []

    for (let count = 0; count<countPosts; count++){
        let object = {
            id: array.length+1,
            name: randomWords.generate(crypto.randomInt(2)+1).join(" "),
            description: randomWords.generate(crypto.randomInt(200)+10).join(" "),
            img: imgList[crypto.randomInt(5)],
            likes:crypto.randomInt(10000)
        }
        array.push(object)
    }
    fs.writeFileSync(
        path.join(__dirname+'/Posts/posts.json'),
        JSON.stringify(array,null,4)
    )
    return array
}
function createUsers(countUsers){
    array = []
    for (let count = 0; count<countUsers; count++){
        let object = {
            id: array.length+1,
            name: randomWords.generate(crypto.randomInt(2)+1).join(" "),
            password: randomWords.generate(1).join(" "),
            email: `${randomWords.generate(1)}@gmail.com`
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
module.exports = {
    "createPost":createPost, 
    "createUsers":createUsers
}