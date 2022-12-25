require("dotenv").config();
const database = require("../config/database");
const mysql = require("mysql");
const date = new Date();

const conn = mysql.createConnection(database.default);
// console.log(database.default);
conn.connect((err) => {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Mysql Connected...");
});

exports.getCourse = () => {
  return new Promise(function (resolve, reject) {
    if (date.getMonth() > 6) {
      sql = "SELECT * FROM course WHERE mod(semester,2) = 0;"
    } else {
      sql = "SELECT * FROM course WHERE mod(semester,2) <> 0;"
    }
    conn.query(
      "SELECT config_value FROM config where config_name = 'semester_auto_detect';", (err, row) => {

        if (err) {
          reject(err);
        }

        if (row[0].config_value != "true") {
          conn.query(
            "SELECT config_value FROM config where config_name = 'semester';", (err, row) => {
              if (err) {
                reject(err);
              }
              if (row[0].config_value == "genap") {
                sql = "SELECT * FROM course WHERE mod(semester,2) = 0;"
              } else {
                sql = "SELECT * FROM course WHERE mod(semester,2) <> 0;"
              }
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
        } else {
          conn.query(
            sql,
            (err, result, field) => {
              if (err) {
                reject(err);
              }
              resolve(result)
            }
          );

        }

      })
  })
}
