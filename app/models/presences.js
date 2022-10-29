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

exports.setPresence = (data, callback) => {
  let sql =  "UPDATE participants SET status='1'  WHERE schedule_id = "+data.schedule_id+" AND mahasiswa_id = "+data.mahasiswa_id+""
  conn.query(
    sql,
    (err, result, field) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result, field);
    }
  );
}