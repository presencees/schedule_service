const {responseData, responseMessage} = require("../utils/response-handler");
const {getRoom} = require("../models/room");

exports.getRoom = async (req, res, next) => {
  let data = await getRoom()
  if (data) {
    responseData(res, 200, data)
  } else {
    responseMessage(res, 500, "internal server error!");
  }
}
