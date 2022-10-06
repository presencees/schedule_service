const responseData = function (response, statusCode, values) {
  const status = statusCode < 200 || statusCode >= 400 ? false : true;

  var data = {
    err_code: statusCode,
    err_desc: "sucess",
    data: values,
  };
  if (values.length == 0) {
    data.err_code = "404";
    data.err_desc = "data not found";
  }
  response.status(statusCode).json(data);
  response.end();
};

const responseMessage = function (response, statusCode, message) {
  const status = statusCode < 200 || statusCode >= 400 ? false : true;

  var data = {
    success: status,
    message: message,
  };
  response.status(statusCode).json(data);
  response.end();
};

module.exports = { responseData, responseMessage };
