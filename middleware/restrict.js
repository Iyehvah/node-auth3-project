const jwt = require("jsonwebtoken")

function restrict() {
    const authError = {
        message: "Invalid Creds"
    }

    return async (req, res, next) => {
        try {
            const { token } = req.cookies
            if(!token) {
                return res.status(401).json({authError})
            }
            //verifying the token hasnt been tampered with
            jwt.verify(token, process.env.MY_SECRET, (error, decoded) => {
                if(error) {
                    return res.status(401).json({authError})
                }

                req.token = decoded
                console.log(decoded)


                next()
            })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = restrict