require("dotenv").config()
const mysql = require("mysql2/promise")

async function ConnectToDB() {
    try {
        const connection = await mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            port: process.env.PORT_DB,
            connectionLimit: process.env.CONNECTIONLIMIT,
            database: process.env.SCHEMA
        });
        return connection
    } catch (ex) {
        console.log(ex)
    }
}

module.exports = ConnectToDB