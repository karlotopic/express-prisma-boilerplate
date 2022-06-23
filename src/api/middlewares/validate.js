const { securityService } = require("../../services");

exports.validateJoi = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(500).json({
        status: "error",
        message: error.details[0].message,
      });
    else next();
  };
};

exports.validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res
      .status(400)
      .json({ status: "error", message: "No token provided!" });

  const isValid = securityService.validateToken(
    token.replace("Bearer ", "")
  );
  if (!isValid)
    return res
      .status(401)
      .json({ status: "error", message: "Token not valid!" });
  next();
};
