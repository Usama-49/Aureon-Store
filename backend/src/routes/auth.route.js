const express = require("express");
const {
  register,
  login,
  getItems,
  verify,
  logout,
  verifyEmail,
  oAuthStart,
  oAuthCallback,
  forgotPass,
  resetPass,
} = require("../controllers/auth.controller");
const loginValidation = require("../middlewares/login.validation");
const registerValidator = require("../middlewares/register.validation");
const { verifyToken, requireVerified } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidation, login);
router.get("/verify", verifyToken, verify);
router.get("/getItems", verifyToken, requireVerified, getItems);
router.post("/logout", logout);
router.get("/verify-email", verifyEmail);
router.get("/google", oAuthStart);
router.get("/google/callback", oAuthCallback);
router.post("/forgot-password",forgotPass);
router.post("/reset-password",resetPass);


module.exports = router;
