const {responseData, responseMessage} = require("../utils/response-handler");
const {getCourse} = require("../models/course");

exports.getCourse = async (req, res, next) => {
  let data = await getCourse()
  if (data) {
    responseData(res, 200, data)
  } else {
    responseMessage(res, 500, "internal server error!");
  }
}
