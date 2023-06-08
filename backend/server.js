require("dotenv").config()
const express = require("express")
const cors = require("cors")
const server = express()

const port = process.env.PORT
const router = require("./router")

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: false}))

server.listen(port, () => {
    console.log(`I am listening on localhost:${port}`)
})

server.use(router)
