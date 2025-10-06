
const usersMethods = require("./users.service")

module.exports = {
    getUserByName: async (req,res) => {
        const name = req.params.name
        const responseData = await usersMethods.getUserByName(name)
        await res.status(responseData.status).json(responseData.response)
    },
    
    getUserById: async (req,res) => {
        const id = req.params.id
        const fields = req.query.fields
        const responseData = await usersMethods.getUserById(id,fields)
        await res.status(responseData.status).json(responseData.response)
    },
    createUsersMany: async (req,res) => {
        const body = req.body
        const responseData = await usersMethods.createUsersMany(body)
        await res.status(responseData.status).json(responseData.response)

    }
}