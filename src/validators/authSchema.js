const Joi = require("joi");

const userAndPw = {
  username: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
};

exports.loginSchema = Joi.object(userAndPw);

exports.registerSchema = Joi.object({
  ...userAndPw,
  email: Joi.string().email().lowercase().required(),
});
