const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "",
  user: "",
  database: "",
  password: ""
})

module.exports = pool.promise()
