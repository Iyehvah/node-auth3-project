const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")
const jwt = require("jsonwebtoken")
const router = express.Router()
const db = require("../data/config")
const restrict = require("../middleware/restrict")

router.post("/register", async (req, res, next) => {
    try {
        //pulling the username the client entered from the request body
        const { username } = req.body
        //finding the user in our database IF IT EXISTS
        const user = await Users.findBy({username}).first()
        //if user exists already it will return this error message
        if(user){
            return res.status(409).json({
                message: "That username is not available",
            })
        }
        //if username is NOT taken it pushed our new user to our database into the users table
        res.status(201).json(await Users.addUser(req.body))
    } catch(error) {
        next(error)
    }
})

router.post("/login", async (req, res, next) => {
    try {   
        const { username, password } = req.body
        const user = await Users.findBy({ username }).first()
        if(!user) {
            return res.status(401).json({
                message: "YOUUUU SHALL NOTTTTT PASSSSS"
            })
        }
        console.log("checkpoint 1")

        const passwordValidation = await bcrypt.compare(password, user.password)
        if(!passwordValidation) {
            return res.status(401).json({
                message: "YOU SHALLL NOTTTT PASSSSSSS"
            })
        }
        console.log("checkpoint 2")

        const payload = {
            userId: user.id,
            userRole: "admin"
        }
        console.log("checkpoint 3")
        const expireToken = {
            expiresIn: '15s'
        }
        const token = jwt.sign(payload, process.env.MY_SECRET, expireToken)
        console.log("checkpoint 4")
        res.cookie("token", token)
        console.log("checkpoint 5")
        res.json({
            message: `Welcome ${user.username}!`,
            token: token
        })

    } catch(error) {
        next(error)
    }
})

module.exports = router