const { userModel } = require("../../models");
const { securityService } = require("../../services");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const dbUser = await userModel.getUser(username);
  if (!dbUser) return res.status(400).send("User not existing!");

  const validPassword = await securityService.checkPassword(
    password,
    dbUser.password
  );
  if (!validPassword)
    return res.status(401).send("Not authenticated!");

  // TO DO: hash the content and then generate access token (sign)
  const accessToken = securityService.sign(req.body);
  res.status(200).send(accessToken);
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const isExisting = await userModel.getUser(username);
  if (isExisting)
    return res.status(400).send("User already existing!");

  const encryptedPassword = await securityService.encrypt(password);
  try {
    await userModel.createUser({
      ...req.body,
      password: encryptedPassword,
    });
  } catch (err) {
    return res.status(500).send("Database error!");
  }

  const accessToken = securityService.sign(req.body);
  res.status(200).send(accessToken);
};
