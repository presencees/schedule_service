require("dotenv").config();
const database = require("../config/database");
const mysql = require("mysql");

const conn = mysql.createConnection(database.default);
// console.log(database.default);
conn.connect((err) => {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Mysql Connected...");
});

