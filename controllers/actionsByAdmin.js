const getConnection = require("../database/connectDB")
require("dotenv").config()
const moment = require("moment")

async function addVacaction(body) {
    const { destination, description, image, check_in_date, check_out_date, price } = body;
    const addVacationQuery = `INSERT INTO ${process.env.SCHEMA}.vacations_list (description, destination, image, check_in_date, check_out_date, price)
     VALUES (?, ?, ?, ?, ?, ?)`
    const connection = await getConnection();
    const [rows] = await connection.execute(addVacationQuery, [destination, description, image, check_in_date, check_out_date, price])
    console.log(rows)
    return rows.affectedRows;
}

async function deleteVacation(vacation_id) {
    const delVacationQuery = `DELETE FROM ${process.env.SCHEMA}.vacations_list WHERE (id = ?)`
    const connection = await getConnection();
    const [rows] = await connection.execute(delVacationQuery, [vacation_id])
    console.log(rows)
    return rows.affectedRows;
}

async function updateVacation(body) {
    const { id, description, destination, image, check_in_date, check_out_date, price } = body
    const checkIn = moment(check_in_date).format("YYYY-MM-DD")
    const checkOut = moment(check_out_date).format("YYYY-MM-DD")
    const updateQuery = `UPDATE ${process.env.SCHEMA}.vacations_list SET description = ?, destination = ?, image = ? ,
    check_in_date = ?, check_out_date = ?, price = ? WHERE (id = ?)`
    const connection = await getConnection();
    const [rows] = await connection.execute(updateQuery, [description, destination, image, checkIn, checkOut, price, id])
    console.log(rows)
    return rows.affectedRows;
}


module.exports = { addVacaction, deleteVacation, updateVacation }