const { getAll, getFilter, getByDate, insert, getParticipants } = require("../models/schedules");
const { responseData, responseMessage } = require("../utils/response-handler");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);

const scheduleSchema = {
  type: "object",
  properties: {
    lecturer_id: {
      type: "number",
    },
    lecturer_name: {
      type: "string",
    },
    subject_id: {
      type: "number",
    },
    subject_name: {
      type: "string",
    },
    start_time: {
      type: "object",
      format: "date-time",
    },
    end_time: {
      type: "object",
      format: "date-time",
    },
    room: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  required: [
    "lecturer_id",
    "lecturer_name",
    "subject_id",
    "subject_name",
    "start_time",
    "end_time",
  ],
  additionalProperties: false,
};

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
  getByDate(res, (err, rows, field) => {
    if (err) {
      responseMessage(res, 200, err);
    }
    responseData(res, 200, rows);
  });
};

exports.add = (req, res, next) => {
  const validate = ajv.compile(scheduleSchema);
  req.body.start_time = new Date(req.body.start_time);
  req.body.end_time = new Date(req.body.end_time);
  const valid = validate(req.body);
  if (valid) {
    insert(req.body, (err, result, field) => {
      if (err) {
        responseMessage(res, 200, err);
      }
      responseData(res, 200, { insertId: result.insertId });
    });
  } else {
    const errorText = ajv.errorsText(validate.errors);
    responseMessage(res, 400, errorText);
  }
};

exports.getParticipantsSchedule = (req, res, next) => {
  getParticipants(req, (err, rows, field) => {
    if (err) {
      responseMessage(res, 500, err);
    }
    responseData(res, 200, rows);
  });
}