const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoute")

const app = express();
require("dotenv").config();

app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoutes)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((err) => {
        console.log(err.message)
    })

app.listen(process.env.PORT,() => {
    console.log(`Server Listening at port ${process.env.PORT}`)
})