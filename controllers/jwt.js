const jwt = require("jsonwebtoken")
require("dotenv").config()

async function getToken(data) {
    return new Promise((resolve, reject) => {
        jwt.sign(data, process.env.SECRET, function (err, token) {
            if (err) {
                console.log(err)
                reject(err)
            }
            resolve(token)
        })
    })
}

async function verifyToken(token) {
    console.log("token", token)
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                console.log(err)
                reject(err)
            }
            resolve(decoded)
        })
    })
}

module.exports = { getToken, verifyToken }