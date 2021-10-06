const express = require("express")

const controller = require("../controller/controller")

const router = express.Router()

router.get("/", controller.getItems)

router.post("/", controller.postItem)

module.exports = router