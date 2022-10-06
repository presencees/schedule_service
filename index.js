const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const mysql = require("mysql");
// const md5 = require("md5");
// import * as dotenv from 'dotenv';
// dotenv.config()

require("dotenv").config();
// console.log(process.env)
require("./app/routes/route.js")(app);

const PORT = process.env.APP_PORT;
// parse application/json
app.use(bodyParser.json());

// const config = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// };
//create database connection
// const conn = mysql.createConnection(config);
// console.log(config);

//connect to database
// conn.connect((err) => {
//   // if(err) throw err;
//   if (err) {
//     return console.error("error: " + err.message);
//   }
//   console.log("Mysql Connected...");
// });

//Server listening
app.listen(PORT, () => {
  console.log("Server started on port " + PORT + "...");
});
