const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "reglist",
  password: "555556"
})

module.exports = pool.promise()