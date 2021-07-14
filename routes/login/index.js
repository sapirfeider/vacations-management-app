const express = require("express")
const router = express.Router();
const getConnection = require("../../database/connectDB")
const getValidationFunction = require("../../validation/validationAuth")
const { isUserExist, registration } = require("../../controllers/login")
const { getToken } = require("../../controllers/jwt")

router.post("/login", getValidationFunction("login"), async (req, res, next) => {
    const { user_name, password } = req.body;
    try {
        const result = await isUserExist(user_name, password)
        if (result) {
            const token = await getToken(user_name)
            if (token) {
                res.cookie("token", token)
                return res.json({
                    "message": `Hello ${result.first_name}, your login is success`, token,
                    "role": result.role, "id": result.id, "name": result.first_name
                })
            }
            throw new Error("login fail")
        }
        throw new Error("login fail")
    } catch (ex) {
        console.log(ex)
        return next({ message: ex, status: 400 })
    }
})

router.post("/register", getValidationFunction("register"), async (req, res, next) => {
    const { user_name } = req.body;
    try {
        const result = await isUserExist(user_name)
        if (result) throw new Error("user already exist")
        const response = await registration(req.body)
        if (response.affectedRows) {
            const token = await getToken(user_name)
            if (token) {
                res.cookie("token", token)
                return res.json({
                    "message": `welcome , your login is success`, token, "id": response.insertId
                })
            }
        }
        throw new Error("register failed")
    } catch (ex) {
        console.log(ex)
        return next({ message: ex, status: 400 })
    }
})

module.exports = router;