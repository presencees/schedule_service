const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const mysql = require("mysql");
// const md5 = require("md5");
// import * as dotenv from 'dotenv';
// dotenv.config()

// parse application/json
app.use(bodyParser.json());
require("dotenv").config();

require("./app/routes/route.js")(app);

const PORT = process.env.APP_PORT;

//Server listening
app.listen(PORT, () => {
  console.log("Server started on port " + PORT + "...");
});
