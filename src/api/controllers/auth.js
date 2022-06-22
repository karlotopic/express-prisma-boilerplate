const jwt = require("jsonwebtoken");
const { userModel } = require("../../models");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const isAuthenticated = await userModel.getUser(username, password);
  if (!isAuthenticated) return res.status(400).send("User not existing!");
  const accessToken = jwt.sign(
    { username, password },
    process.env.JWT_SECRET_KEY
  );
  res.status(200).send({ accessToken });
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  // TO DO : Check if username exists!
  try {
    await userModel.createUser(req.body);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Database error!");
  }

  const accessToken = jwt.sign(
    { username, password },
    process.env.JWT_SECRET_KEY
  );
  res.status(200).send({ accessToken });
};
