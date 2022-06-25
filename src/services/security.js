const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.sign = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return {
    accessToken: `Bearer ${token}`,
  };
};

exports.validateToken = (token) =>
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    (err, decoded) => decoded
  );

exports.encrypt = async (payload) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(payload, salt);
};

exports.checkPassword = async (pw, actualPw) =>
  await bcrypt.compare(pw, actualPw);
