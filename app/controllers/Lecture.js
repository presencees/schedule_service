const {responseData, responseMessage} = require("../utils/response-handler");
const {getLecture} = require("../models/lecture");

exports.getLecture = async (req, res, next) => {
  let data = await getLecture()
  if (data) {
    responseData(res, 200, data)
  } else {
    responseMessage(res, 500, "internal server error!");
  }
}
