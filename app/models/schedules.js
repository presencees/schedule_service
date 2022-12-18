require('dotenv').config();
const database = require("../config/database");
const {responseData, responseMessage} = require("../utils/response-handler");
const axios = require('axios');
const mysql = require("mysql");
const date = new Date();

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

exports.getFilter = async (req) => {
  return new Promise(function (resolve, reject) {
    let where = "";
    let query = req.query;

    const keys = Object.keys(query);
    for (let i of keys) {
      const r = query[i];
      if (i == 'schedule_id') {
        where = where + " AND " + i + " = '" + r + "'";
      } else {
        where = where + " AND " + i + " like '%" + r + "%'";
      }
    }
    let join = "INNER JOIN course ON schedule.course_id=course.course_id";
    join += " INNER JOIN room ON schedule.room_id=room.room_id";
    join += " INNER JOIN lecture ON schedule.lecture_id=lecture.lecture_id";
    join += " LEFT JOIN participants ON schedule.schedule_id = participants.schedule_id";
    let sql = "SELECT schedule.*, course.course_name, room.room_name, lecture.lecture_name FROM schedule " + join + " where 1" + where + " GROUP BY schedule.schedule_id";
    conn.query(sql, async (error, rows) => {
      let data = []
      for (let r in rows) {
        resultParticipant = await Participants(rows[r].schedule_id)
        data.push({...rows[r], participants: resultParticipant})
      }
      resolve(data)
    })
  })

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

exports.update = (data, calback) => {
  scheduleId = data.schedule_id
  delete data.schedule_id
  conn.query(
    "UPDATE schedule SET ? WHERE schedule_id = " + scheduleId + "",
    data,
    function (error, results, fields) {
      if (error) throw error;
      calback(error, results, fields);
    }
  );
};

exports.deleteSchedule = (scheduleId) => {
  return new Promise(function (resolve, reject) {
    conn.query(
      "DELETE FROM schedule WHERE schedule_id = " + scheduleId + "",
      function (error, result) {
        if (error) throw error;
        if (result.affectedRows != 0) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    );
  })
};

exports.getParticipants = (req, calback) => {
  let where = "";
  let query = req.query;

  const keys = Object.keys(query);
  for (let i of keys) {
    const r = query[i];
    if (i == 'schedule_id') {
      where = where + " AND " + i + " = '" + r + "'";
    } else {
      where = where + " AND " + i + " like '%" + r + "%'";
    }
  }

  let sql = "SELECT * FROM participants where 1" + where;

  conn.query(sql, (err, rows, field) => {

    calback(err, rows, field);
  });
}

async function Participants(schedule_id) {
  return new Promise(function (resolve, reject) {

    let where = " AND schedule_id = '" + schedule_id + "'";
    let sql = "SELECT * FROM participants where 1" + where;
    conn.query(sql, (err, rows, field) => {
      resolve(rows);
    });

  });
}

exports.getLectureMeet = (req) => {
  return new Promise(function (resolve, reject) {
    let courseId = req.params.id
    let maxMeet = 16

    let where = " AND course_id = '" + courseId + "'";
    let sql = "SELECT * FROM schedule where 1" + where;
    conn.query(sql, (err, rows) => {
      let data = []
      let dataLectureMeet = []
      let dataMaxMeet = arr = Array.from({length: maxMeet}, (_, index) => index + 1)
      //let datab = new Array(16);
      if (rows.length > 0) {
        for (let r in rows) {
          dataLectureMeet.push(rows[r].lecture_meet)
        }

        data = [...new Set([...dataLectureMeet, ...dataMaxMeet])]
        data = data.filter(item => !dataLectureMeet.includes(item))

      } else {
        data = arr = Array.from({length: maxMeet}, (_, index) => index + 1)
      }
      resolve(data);
    });

  });
}

exports.addParticipants = async (schedule_id, lecture_id, generation) => {
  conn.query(
    "SELECT semester FROM course where course_id = " + generation, async (err, row) => {
      if (err) throw error;
      semester = row[0].semester
      if (semester <= 2) {
        generation = date.getFullYear()
      } else {
        generation = ((semester * 5.5) / 12) - date.getFullYear()
        generationSplit = String(Math.abs(generation)).split(".")
        if (generationSplit.length > 1) {
          if (parseInt(generationSplit[1]) >= 0 && parseInt(generationSplit[1]) < 2) {
            generation = generationSplit[0]
          } else if (parseInt(generationSplit[1]) > 2) {
            generation = parseInt(generationSplit[0]) + 1
          }
        } else {
          generation = generationSplit[0]
        }
      }
      Math.abs(generation)
      let params = {generation: generation, lecture_id: lecture_id}
      let result = await axios.get(process.env.USER_SERVICE_BASE_URL + `/mahasiswa`, {params});
      for (let r in result.data.response) {
        conn.query(
          "INSERT INTO participants SET ?", {schedule_id: schedule_id, mahasiswa_id: result.data.response[r].mahasiswa_id, full_name: result.data.response[r].full_name, status: 0})
      }
    })

};
