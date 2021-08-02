const { verifyToken } = require("../controllers/jwt")

async function hasToken(req,res,next) {
    try {
        const clientToken = req.cookies.token
        const verify = await verifyToken(clientToken)
        console.log("verify", verify)
        req.user = verify;
        if (verify) return next()

    } catch (err) {
        return next(err)
    }

}

module.exports = { hasToken }