const jwt = require("jsonwebtoken");
const now = Date.now();

exports.verify = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (payload.exp - now > 0) {
    return {
      status: true,
      msg: "Tuken sudah sesuai",
      data: payload,
    };
  } else {
    return {
      status: false,
      msg: "token sudah tidak berlaku.",
      data: [],
    };
  }
};

exports.createJwt = (dataToken) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    iat: now,
    exp: now + 1000 * 60 * 60 * 24, // satu hari (24 jam)
    // exp:now, // satu hari (24 jam)
    dataToken,
  };
  const token = jwt.sign(data, jwtSecretKey);
  return token;
};
