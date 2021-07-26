const getConnection = require("../database/connectDB")
require("dotenv").config()


async function isUserExist(user_name, password) {

    const params = password ? [user_name, password] : [user_name]
    const passwordQuery = password ? ` AND users.password = ? ` : "";
    
    const query = `select * from ${process.env.SCHEMA}.users where user_name = ? ${passwordQuery}`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, params)
    return rows[0]
}

async function registration(body) {
    const { first_name, last_name, user_name, password } = body;
    const query = `INSERT INTO ${process.env.SCHEMA}.users ( first_name, last_name, user_name, password) VALUES ( ?,?,?,?)`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [first_name, last_name, user_name, password])
    console.log(rows)
    return rows;
}


module.exports = { isUserExist, registration }