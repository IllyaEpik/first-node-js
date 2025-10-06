const express = require("express")
const controllerData = require("./users.controller")
const router = express.Router()

router.get("/byName/:name", controllerData.getUserByName)
router.get("/byId/:id", controllerData.getUserById)
router.post("/create", controllerData.createUsersMany)

module.exports = router