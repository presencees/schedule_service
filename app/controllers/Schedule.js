const {getAll, getFilter, getByDate, insert, update, deleteSchedule, getLectureMeet, getParticipants, addParticipants} = require("../models/schedules");
const presences = require("../models/presences");
const {responseData, responseMessage} = require("../utils/response-handler");
const jwt = require("../helpers/tokenHelper");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const axios = require('axios');
const ajv = new Ajv();
const cache = require('../helpers/cacheHelper');

const sesPrefix = "ses";

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
    course_id: {
      type: "number",
    },
    start_time: {
      type: "object",
      format: "date-time",
    },
    end_time: {
      type: "object",
      format: "date-time",
    },
    room_id: {
      type: "number",
    },
    lecture_id: {
      type: "number",
    },
    lecturer_meet: {
      type: "number",
    },
    presence_duration: {
      type: "number",
    },
    description: {
      type: "string",
    },
  },
  required: [
    "lecturer_id",
    "lecturer_name",
    "course_id",
    "start_time",
    "end_time",
    "room_id",
    "lecture_meet",
    "presence_duration",
  ],
  additionalProperties: true,
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
    let resCode = (rows.length > 0) ? 200 : 404;
    responseData(res, resCode, rows);
  });
};

exports.getScheduleFilter = async (req, res, next) => {
  result = await getFilter(req)
  if (result.length != 0) {
    responseData(res, 200, result);
  } else {
    responseMessage(res, 404, 'not found!');
  }
};

exports.getScheduleByDate = (req, res, next) => {
  getByDate(res, (err, rows, field) => {
    if (err) {
      responseMessage(res, 200, err);
    }
    let resCode = (rows.length > 0) ? 200 : 404;
    responseData(res, resCode, rows);
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
        responseMessage(res, 500, err);
      }
      responseData(res, 200, {insertId: result.insertId});
      addParticipants(result.insertId, req.body.lecture_id, req.body.course_id);
    });
  } else {
    const errorText = ajv.errorsText(validate.errors);
    responseMessage(res, 400, errorText);
  }
};

exports.update = (req, res, next) => {
  const validate = ajv.compile(scheduleSchema);
  req.body.start_time = new Date(req.body.start_time);
  req.body.end_time = new Date(req.body.end_time);
  const valid = validate(req.body);
  if (valid) {
    update(req.body, (err, result, field) => {
      if (err) {
        responseMessage(res, 200, err);
      }
      responseData(res, 200, {insertId: result.insertId});
    });
  } else {
    const errorText = ajv.errorsText(validate.errors);
    responseMessage(res, 400, errorText);
  }
};

exports.deleteSchedule = async (req, res, next) => {
  result = await deleteSchedule(req.params.id)
  if (result) {
    responseMessage(res, 204, 'delete succes!');
  } else {
    responseMessage(res, 404, 'not found!');
  }
};

exports.getLectureMeet = async (req, res, next) => {
  result = await getLectureMeet(req)
  if (result) {
    responseData(res, 200, result);
  } else {
    responseMessage(res, 404, 'not found!');
  }
};

exports.getParticipantsSchedule = (req, res, next) => {
  getParticipants(req, (err, rows, field) => {
    if (err) {
      responseMessage(res, 500, err);
    }
    let resCode = (rows.length > 0) ? 200 : 404;
    responseData(res, resCode, rows);
  });
};

exports.getServices = (req, res, next) => {
  axios.get('http://kong:8001/services')
    .then(function (response) {
      // handle success
      // console.log(response);
      responseData(res, 200, response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      responseData(res, 200, error);
    })
}

exports.qrToken = async (req, res, next) => {
  if (req.query.schedule_id) {
    const dataQr = {
      schedule_id: req.query.schedule_id,
      create_at: Date.now()
    };
    const qrToken = jwt.createJwt(dataQr);

    cache.set('{"' + sesPrefix + req.query.schedule_id + '": "' + qrToken + '"}')
    // console.log( cache.get(sesPrefix+req.query.schedule_id));
    const token = cache.get(sesPrefix + req.query.schedule_id)
    // console.log(token);
    responseData(res, 200, qrToken);
  } else {
    responseMessage(res, 400, "schedule_id is required");
  }
};

exports.qrVerify = async (req, res, next) => {
  // console.log(req.body);
  if (req.body.token) {
    const token = req.body.token;
    const mahasiswa_id = req.body.mahasiswa_id;
    const rawToken = jwt.verify(token);
    if (rawToken.status) {
      const schedule_id = rawToken.data.dataToken.schedule_id;
      const cacheToken = cache.get(sesPrefix + schedule_id);
      if (cacheToken == token) {
        const dataPresence = {
          schedule_id: schedule_id,
          mahasiswa_id: mahasiswa_id,
          create_at: Date.now()
        }
        presences.setPresence(dataPresence, (err, result, field) => {
          if (err) {
            responseMessage(res, 500, err);
          }
          cache.del(sesPrefix + schedule_id);
          responseData(res, 200, dataPresence);
        });
      } else {
        responseMessage(res, 400, "token is invalid");
      }
    } else {
      responseMessage(res, 400, rawToken.message);
    }
  } else {
    responseMessage(res, 400, "token is required");
  }
}
