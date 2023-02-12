const jwt = require("jsonwebtoken")


const createJWT = async (req, res, next) => {
    try {
        if (req.body.email) {
            //new json web token generated
            const newJwtToken = await jwt.sign({ email: req.body.email }, process.env.SECRET_HASH, { expiresIn: '1d' })
            req.accessToken = newJwtToken;
            next()
        } else {
            res.status(401).json({ message: "Unauthorized Access" })
        }
    } catch {
        res.status(500).json({ error: "Internal Server Error" })
    }



}

module.exports = createJWT