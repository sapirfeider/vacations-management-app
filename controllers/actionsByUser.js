const getConnection = require("../database/connectDB")
require("dotenv").config()

async function getVacations(user_id) {
    const getVacationsQuery = `SELECT 
    ${process.env.SCHEMA}.vacations_list.id , ${process.env.SCHEMA}.vacations_list.destination, ${process.env.SCHEMA}.vacations_list.description,
    ${process.env.SCHEMA}.vacations_list.image, ${process.env.SCHEMA}.vacations_list.check_in_date, ${process.env.SCHEMA}.vacations_list.check_out_date,
    ${process.env.SCHEMA}.vacations_list.price, ${process.env.SCHEMA}.followers.user_id , ${process.env.SCHEMA}.vacations_list.followers_number
    FROM ${process.env.SCHEMA}.vacations_list
       LEFT JOIN
       ${process.env.SCHEMA}.followers ON vacations_list.id = followers.vacation_id
        AND followers.user_id = ?
        order by followers.user_id = ? desc`
    const connection = await getConnection();
    const [rows] = await connection.execute(getVacationsQuery, [user_id, user_id])
    console.log(rows)
    return rows;
}

async function followVacation(user_id, vacation_id) {
    const followVacationQuery = `INSERT INTO ${process.env.SCHEMA}.followers (user_id, vacation_id) VALUES (?, ?)`
    const connection = await getConnection();
    const [rows] = await connection.execute(followVacationQuery, [user_id, vacation_id])
    console.log(rows)
    return rows.affectedRows;
}

async function updateFollowersCounterUp(vacation_id) {
    const updateCountFollowers = `UPDATE ${process.env.SCHEMA}.vacations_list SET followers_number = followers_number+1 WHERE (id = ?)`
    const connection = await getConnection();
    const [rows] = await connection.execute(updateCountFollowers, [vacation_id])
    console.log(rows)
    return rows.affectedRows;
}

async function updateFollowersCounterDown(vacation_id) {
    const updateCountFollowers = `UPDATE ${process.env.SCHEMA}.vacations_list SET followers_number = followers_number-1 WHERE (id = ?)`
    const connection = await getConnection();
    const [rows] = await connection.execute(updateCountFollowers, [vacation_id])
    console.log(rows)
    return rows.affectedRows;
}

async function unfollowVacation(user_id, vacation_id) {
    const unfollowVacationQuery = `DELETE FROM ${process.env.SCHEMA}.followers WHERE (user_id = ? and vacation_id = ?);`
    const connection = await getConnection();
    const [rows] = await connection.execute(unfollowVacationQuery, [user_id, vacation_id])
    console.log(rows)
    return rows.affectedRows;
}

async function vacationsByDate() {
    const getVacationsQuery = `SELECT * FROM ${process.env.SCHEMA}.vacations_list order by check_in_date`
    const connection = await getConnection();
    const [rows] = await connection.execute(getVacationsQuery)
    console.log(rows)
    return rows;

}


module.exports = { getVacations, vacationsByDate, followVacation, updateFollowersCounterUp, unfollowVacation, updateFollowersCounterDown }
