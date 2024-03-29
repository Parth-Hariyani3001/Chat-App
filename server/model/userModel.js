const mongoose = require("mongoose");

const userSchemna = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password : {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    isAvaterImageSet : {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: ""
    },
})

module.exports = mongoose.model("Users",userSchemna)