const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const schedule = require("../controllers/Schedule");
const room = require("../controllers/Room");
const lecture = require("../controllers/Lecture");
const course = require("../controllers/Course");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.json(schedule.default(req, res));
  });

  app.get("/getSchedule", async (req, res) => {
    schedule.getAllSchedule(req, res);
  });

  app.get("/getScheduleFilter/", async (req, res) => {
    // console.log(req.params.id);
    await schedule.getScheduleFilter(req, res);
  });

  app.get("/participants/", async (req, res) => {
    // console.log(req.params.id);
    schedule.getParticipantsSchedule(req, res);
  });

  app.post("/addSchedule/", async (req, res) => {
    schedule.add(req, res);
  });

  app.put("/schedule", async (req, res) => {
    schedule.update(req, res);
  });

  app.delete("/schedule/:id", async (req, res) => {
    schedule.deleteSchedule(req, res);
  });

  app.get("/presences/qrToken", async (req, res) => {
    schedule.qrToken(req, res);
  });

  app.post("/presences/qrVerify", async (req, res) => {
    schedule.qrVerify(req, res);
  });

  app.get("/room", async (req, res) => {
    room.getRoom(req, res);
  });

  app.get("/lecture", async (req, res) => {
    lecture.getLecture(req, res);
  });

  app.get("/course", async (req, res) => {
    course.getCourse(req, res);
  });

  app.get("/lectureMeet/:id", async (req, res) => {
    schedule.getLectureMeet(req, res);
  });

};
