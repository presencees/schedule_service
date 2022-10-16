const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const schedule = require("../controllers/Schedule");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.json(schedule.default(req, res));
  });

  app.get("/getSchedule", async (req, res) => {
    schedule.getAllSchedule(req, res);
  });

  app.get("/getScheduleFilter/", async (req, res) => {
    // console.log(req.params.id);
    schedule.getScheduleFilter(req, res);
  });

  app.get("/participants/", async (req, res) => {
    // console.log(req.params.id);
    schedule.getParticipantsSchedule(req, res);
  });

  app.post("/addSchedule/", async (req, res) => {
    schedule.add(req, res);
  });
};
