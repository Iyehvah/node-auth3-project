const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const welcomeRouter = require("./welcome/welcome")
const usersRouter = require("./users/users-router")
const server = express()
const port = process.env.PORT || 3000

const errorsNstuff = {
    message: "Something went wrong"
}

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser())

server.use("/", welcomeRouter)
// server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.use( (error, req, res, next) => {
    res.status(500).json(errorsNstuff)
})

server.listen( port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})