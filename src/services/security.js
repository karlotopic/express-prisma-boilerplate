const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.sign = (payload) => jwt.sign(payload, process.env.JWT_SECRET_KEY);

exports.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.checkPassword = async (pw, actualPw) =>
  await bcrypt.compare(pw, actualPw);
