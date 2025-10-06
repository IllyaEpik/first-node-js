
const postsMethods = require("./posts.service")

module.exports = {
    getPostById: (req,res) => {
        const id = req.params.id
        const responseData = postsMethods.getPostById(id)
        res.status(responseData.status).json(responseData.response)
    },
    getAllPosts: (req,res) => {
        const skip = req.query.skip
        const take = req.query.take
        const filter = req.query.filter
        const responseData = postsMethods.getAllPosts(skip,take,filter)
        res.status(responseData.status).json(responseData.response)
    },
    createUserPost: async (req,res) => {
        const body = req.body
        const responseData = await postsMethods.createUserPost(body)
        res.status(responseData.status).json(responseData.response)

    },
    createPosts: async (req,res) => {
        const body = req.body
        const responseData = await postsMethods.createPosts(body)
        res.status(responseData.status).json(responseData.response)
    }
    // 
}