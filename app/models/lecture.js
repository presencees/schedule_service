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

exports.getLecture = () => {
  return new Promise(function (resolve, reject) {
    let sql = "SELECT * FROM lecture;"
    conn.query(
      sql,
      (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result)
      }
    );
  })
}
