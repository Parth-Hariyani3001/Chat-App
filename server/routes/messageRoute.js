const express = require("express");
const messageController = require("./../controllers/messageController")

const router = express.Router();

router.post("/addmsg",messageController.addMessage)
router.post("/getmsg",messageController.getAllMessages)
 
module.exports = router;