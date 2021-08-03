const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
//const cors = require("cors")
const loginRoute = require("./routes/auth/index")
const vacationsRoute = require("./routes/vacations/index")
const { hasToken } = require("./middleware/hasToken")
require("dotenv").config()
const api = express();
//api.use(cors());
const path = require('path');
api.use(cookieParser()); // parser cookie -> req.cookies

const getConnection = require("./database/connectDB")

global.__basedir = __dirname;

initConnection()


async function initConnection() {
    global.connection = await getConnection();
}

api.use(bodyParser.json())

api.use(express.static(path.join(__dirname, '/build')));

api.get("/check", (req, res, next) => {
    return res.send("check success!")
})


api.use("/auth", loginRoute)
api.use("/vacations", hasToken, vacationsRoute)

api.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


api.use((error, req, res, next) => {
    console.log("error details:", error)
    const errorMessage = error.message || error[0].message
    const status = error.status || 500
    return res.status(status).send(errorMessage)
})

api.listen(process.env.PORT, () => { console.log("server start listen to port 5000") })