exports.validateJoi = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error)
      res.status(500).json({
        status: "error",
        message: error.details[0].message,
      });
    else next();
  };
};
