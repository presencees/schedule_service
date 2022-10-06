const database = require("../config/database");
const { responseData, responseMessage } = require("../utils/response-handler");
const mysql = require("mysql");
const fields = [
  "schedule_id",
  "lecturer_name",
  "subject_name",
  "start_time",
  "end_time",
  "room",
  "description",
];
const conn = mysql.createConnection(database.default);
// console.log(database.default);
conn.connect((err) => {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Mysql Connected...");
});

exports.getAll = (response, calback) => {
  let sql = "SELECT * FROM schedule";
  conn.query(sql, (err, rows, field) => {
    calback(err, rows, field);
  });
};

exports.getFilter = (req, calback) => {
  let where = "";
  let query = req.query;

  const keys = Object.keys(query);
  for (let i of keys) {
    const r = query[i];
    where = where + " AND " + i + " like '%" + r + "%'";
  }

  let sql = "SELECT * FROM schedule where 1" + where;

  conn.query(sql, (err, rows, field) => {
    calback(err, rows, field);
  });
};

exports.getByDate = (req, calback) => {
  let query = req.req.query;
  let where = query.start_time
    ? "and start_time like '" + query.start_time + "%'"
    : "";
  let sql = "SELECT * FROM schedule where 1 " + where;

  conn.query(sql, (err, rows, field) => {
    calback(err, rows, field);
  });
};
