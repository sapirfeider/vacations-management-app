const getConnection = require("../database/connectDB")
require("dotenv").config()
const moment = require("moment")

async function addVacaction(body) {
    console.log(body)
    const { hotel_name ,destination, description, image, check_in_date, check_out_date, price } = body;
    const addVacationQuery = `INSERT INTO ${process.env.SCHEMA}.vacations_list (hotel_name ,description, destination, image, check_in_date, check_out_date, price)
     VALUES (? ,?, ?, ?, ?, ?, ?)`
    const [rows] = await global.connection.execute(addVacationQuery, [hotel_name, destination, description, image, check_in_date, check_out_date, price])
    return rows.affectedRows;
}

async function deleteVacation(vacation_id) {
    const delVacationQuery = `DELETE FROM ${process.env.SCHEMA}.vacations_list WHERE (id = ?)`
    const [rows] = await global.connection.execute(delVacationQuery, [vacation_id])
    return rows.affectedRows;
}

async function updateVacation(body) {
    const { id, hotel_name, description, destination, image, check_in_date, check_out_date, price } = body
    const checkIn = moment(check_in_date).format("YYYY-MM-DD")
    const checkOut = moment(check_out_date).format("YYYY-MM-DD")
    const updateQuery = `UPDATE ${process.env.SCHEMA}.vacations_list SET hotel_name = ? ,description = ?, destination = ?, image = ? ,
    check_in_date = ?, check_out_date = ?, price = ? WHERE (id = ?)`
    const [rows] = await global.connection.execute(updateQuery, [hotel_name, description, destination, image, checkIn, checkOut, price, id])
    return rows.affectedRows;
}

async function deleteVacationFollowers(vacation_id) {
    const deleteQuery = `DELETE FROM ${process.env.SCHEMA}.followers WHERE (vacation_id = ?);`
    const [rows] = await global.connection.execute(deleteQuery, [vacation_id])
    return rows.affectedRows;
}



module.exports = { addVacaction, deleteVacation, updateVacation , deleteVacationFollowers }