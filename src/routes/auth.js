const express = require("express");
const router = express.Router();
const { authValidator } = require("../validators");
const { authController } = require("../controllers");
const { validateMiddleware } = require("../middlewares");

router.get(
  "/login",
  validateMiddleware.validateJoi(authValidator.loginSchema),
  authController.loginUser
);

router.post(
  "/register",
  validateMiddleware.validateJoi(authValidator.registerSchema),
  authController.registerUser
);

module.exports = router;
