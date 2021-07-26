const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const loginRoute = require("./routes/login/index")
const vacationsRoute = require("./routes/vacations/index")
require("dotenv").config()
const api = express();
// api.use(cors());

api.use(express.static('./public'))

api.use(bodyParser.json())


api.get("/check", (req, res, next) => {
    return res.send("check success!")
})

api.use("/auth", loginRoute)
api.use("/vacations", vacationsRoute)

api.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.js'), err => {
        if (err) {
            res.status(500).send(err)
        }
    })
});


api.use((error, req, res, next) => {
    console.log("error details:", error)
    const errorMessage = error.message || error[0].message
    const status = error.status || 500
    return res.status(status).send(errorMessage)
})

api.listen(5000, () => { console.log("server start listen to port 5000") })