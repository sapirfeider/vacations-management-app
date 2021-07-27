const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const loginRoute = require("./routes/login/index")
const vacationsRoute = require("./routes/vacations/index")
require("dotenv").config()
const api = express();
// api.use(cors());
const path = require('path');
const getConnection = require("./database/connectDB")
const { getVacations , getCategories } = require("./controllers/actionsByUser")

global.__basedir = __dirname;



api.use(async (req, res, next) => {
    console.log(global.connection)
    await initConnection();
    if (global.connection) {
        try {
            const vacations = await getCategories()
            res.status(200).send(vacations)
        } catch (ex) {
            console.log(ex)
            return next({ message: ex, status: 400 })
        }
    }
})

async function initConnection() {
    global.connection = await getConnection();
}

api.use(bodyParser.json())

//api.use(express.static('./public'))
api.use(express.static(path.join(__dirname, 'build')));

api.get("/check", (req, res, next) => {
    return res.send("check success!")
})

api.use("/auth", loginRoute)
api.use("/vacations", vacationsRoute)

// api.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, './build/index.js'), err => {
//         if (err) {
//             res.status(500).send(err)
//         }
//     })
// });

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