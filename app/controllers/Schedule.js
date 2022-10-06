// const jwt = require("../helpers/tokenHelper");
// const database = require("../config/database");
const { getAll, getFilter, getByDate } = require("../models/schedules");
const { responseData, responseMessage } = require("../utils/response-handler");

exports.default = (req, res) => {
  responseMessage(res, 200, "schedule services is available");
};

exports.getAllSchedule = (req, res, next) => {
  // console.log("getAllSchedule");
  getAll(res, (err, rows, field) => {
    // console.log(field);
    if (err) {
      responseMessage(res, 200, err);
    }
    responseData(res, 200, rows);
  });
};

exports.getScheduleFilter = (req, res, next) => {
  // console.log("getAllSchedule");
  // console.log(req.params);
  getFilter(req, (err, rows, field) => {
    if (err) {
      responseMessage(res, 500, err);
    }
    // console.log(err);
    // const row = rows.filter((data) => data.schedule_id == req.params.id);
    responseData(res, 200, rows);
  });
};

exports.getScheduleByDate = (req, res, next) => {
  // console.log("getAllSchedule");
  // console.log(req.params);
  getByDate(res, (err, rows, field) => {
    if (err) {
      responseMessage(res, 200, err);
    }
    // console.log(err);
    // const row = rows.filter((data) => data.start_time == req.params.date);
    responseData(res, 200, rows);
  });
};
