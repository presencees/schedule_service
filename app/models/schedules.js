require("dotenv").config();
const database = require("../config/database");
const { responseData, responseMessage } = require("../utils/response-handler");
const axios = require('axios').default;
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
    if (i=='schedule_id') {
      where = where + " AND " + i + " = '" + r + "'";
    } else {
      where = where + " AND " + i + " like '%" + r + "%'";      
    }
  }
  let join = " LEFT JOIN participants ON schedule.schedule_id = participants.schedule_id";
  let sql = "SELECT schedule.* FROM schedule "+join+" where 1" + where+" GROUP BY schedule.schedule_id";
  console.log(sql);
  conn.query(sql, (err, rows, field) => {
    calback(err, rows.map((data) => {
      return {
        ...data,
        // participants: Participants(data.schedule_id)
      }
     }), field);
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

exports.insert = (data, calback) => {
  conn.query(
    "INSERT INTO schedule SET ?",
    data,
    function (error, results, fields) {
      if (error) throw error;
      calback(error, results, fields);
    }
  );
};

exports.getParticipants = (req, calback) => {
  let where = "";
  let query = req.query;

  const keys = Object.keys(query);
  for (let i of keys) {
    const r = query[i];
    if (i=='schedule_id') {
      where = where + " AND " + i + " = '" + r + "'";
    } else {
      where = where + " AND " + i + " like '%" + r + "%'";      
    }
  }

  let sql = "SELECT * FROM participants where 1" + where;

  conn.query(sql, (err, rows, field) => {
    // setTimeout(() => {
    //   console.log("okeee");
    //   calback(err, rows, field);
    // }, 4000);
    
    calback(err, rows, field);
  });
}

function Participants (schedule_id) {
  let where = " AND schedule_id = '" + schedule_id + "'";
  let sql = "SELECT * FROM participants where 1" + where;
  conn.query(sql, (err, rows, field) => {
    // return rows;
    console.log(rows);
  });
  
  return [{sadasdas:"sdasda",asdasd:"sdasd"},{sadasdas:"sdasda",asdasd:"sdasd"}];
}
