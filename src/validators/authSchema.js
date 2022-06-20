const Joi = require("joi");

const emailAndPw = {
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
};

exports.loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
});

exports.registerSchema = Joi.object({
  ...emailAndPw,
  name: Joi.string().max(50).required(),
});
