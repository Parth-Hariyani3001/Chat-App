const express = require("express");

const router = express.Router();
const userController = require("./../controllers/userController")

router.post("/register",userController.register)
router.post("/login",userController.login)
router.post("/setAvatar/:id",userController.setAvatarImage)
router.get("/allUsers/:id",userController.getAllUsers)


module.exports = router;