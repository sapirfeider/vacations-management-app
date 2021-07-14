const express = require("express")
const route = express.Router();
const getConnection = require("../../database/connectDB")
const { verifyToken } = require("../../controllers/jwt")
const ValidationActions = require("../../validation/validationVacationActions")
const { getVacations, vacationsByDate, followVacation, updateFollowersCounterUp, unfollowVacation, updateFollowersCounterDown } = require("../../controllers/actionsByUser")
const { addVacaction, deleteVacation, updateVacation } = require("../../controllers/actionsByAdmin")

// route.use(async (req, res, next) => {
//     try {
//         console.log(req.cookies)
//         const clientToken = req.cookies.token
//         const verify = await verifyToken(clientToken)
//         console.log("verify", verify)
//         if (verify) return next()

//     } catch (err) {
//         return next(err)
//     }
// })

route.post("/getUserFollowing", async (req, res, next) => {
    const { user_id } = req.body
    if (user_id === "undefined") throw new Error("user_id is required")
    try {
        const result = await getVacations(user_id)
        if (!result.length) throw new Error("no following vacations")
        return res.send(result)

    } catch (error) {
        console.log(error)
        return next({ message: error, status: 400 })
    }
})

route.get("/getVacationsByDate", async (req, res, next) => {
    try {
        const result = await vacationsByDate();
        if (!result.length) throw new Error("no vacations")
        return res.send(result)

    } catch (error) {
        console.log(error)
        return next({ message: error, status: 400 })
    }
})

route.post("/follow", ValidationActions("followingParams"), async (req, res, next) => {
    const { user_id, vacation_id } = req.body;
    try {
        const result = await followVacation(user_id, vacation_id)
        if (!result) throw new Error("follow vaction failed")
        const updateResult = await updateFollowersCounterUp(vacation_id);
        if (!updateResult) throw new Error("update counter failed")
        return res.json({ "message": "follow action success" })

    } catch (error) {
        console.log(error)
        return next({ message: error, status: 400 })
    }
})

route.post("/unfollow", ValidationActions("followingParams"), async (req, res, next) => {
    const { user_id, vacation_id } = req.body;
    try {
        const result = await unfollowVacation(user_id, vacation_id)
        if (!result) throw new Error("unfollow vaction failed")
        const updateResult = await updateFollowersCounterDown(vacation_id);
        if (!updateResult) throw new Error("update counter failed")
        return res.json({ "message": "unfollow action success" })

    } catch (error) {
        console.log(error)
        return next({ message: error, status: 400 })
    }
})

route.post("/add", ValidationActions("vacationDetails"), async (req, res, next) => {
    try {
        const result = await addVacaction(req.body)
        if (!result) throw new Error("adding vacation failed")
        return res.json({ "message": "adding vacation success" })

    } catch (error) {
        return next({ message: error, status: 400 })
    }
})

route.post("/delete", async (req, res, next) => {
    const { vacation_id } = req.body;
    if (vacation_id === "undefined") throw new Error("vacation_id is required")
    try {
        const result = await deleteVacation(vacation_id)
        if (!result) throw new Error("deleting vacation failed")
        return res.json({ "message": "deleting vacation success" })

    } catch (error) {
        console.log(error)
        return next({ message: error, status: 400 })
    }
})

route.post("/update", async (req, res, next) => {
    try {
        const result = await updateVacation(req.body)
        if (!result) throw new Error("updating vacation failed")
        return res.json({ "message": "updating vacation success" })

    } catch (error) {
        console.log(error)
        return next({ message: error, status: 400 })
    }
})

module.exports = route;