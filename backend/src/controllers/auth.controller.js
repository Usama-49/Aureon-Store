const userModel = require("../models/user.model");
const itemsModel = require("../models/items.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendRegistrationEmail,
  sendGoogleWelcomeEmail,
  sendPasswordResetEmail,
} = require("../services/email.service");
const { getGoogleClient, generateToken } = require("../utils/auth.utils");
require("dotenv").config();
const crypto = require("node:crypto");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isUserExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExists) {
      return res.status(409).json({
        message: "User Already Exists ❌",
      });
    }
    const pass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: pass,
    });

    // Generate token
    const verifyToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30m" });
    const clientUrl = process.env.CLIENT_URL;
    const verifyUrl = `${clientUrl}/verify-email?token=${verifyToken}`;
    try {
      sendRegistrationEmail(email, verifyUrl);
    } catch (mailErr) {
      console.error("Nodemailer failed to dispatch:", mailErr);
      return res.status(201).json({
        success: true,
        message: "Account created, but verification email failed to send. Please contact support.",
        role: user.role,
      });
    }
    return res.status(201).json({
      success: true,
      message: "User Created ✅ Please check your email to verify.",
      role: user.role,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const verifyEmail = async (req, res) => {
  const token = req.query?.token;
  if (!token) {
    return res.status(400).json({
      message: "Verify Token not Found!",
    });
  }
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured in .env");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(payload.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(200).json({ message: "Email is already verified" });
    }
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully!",
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
    console.error(err);
    return res.status(500).json({
      message: "Internal server Error!",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Invalid Email Adress ❌",
      });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid Password ❌",
      });
      return;
    }
    const token = generateToken({
      id: user._id,
      role: user.role,
      isBanned: user.isBanned,
      isVerified: user.isVerified,
    });
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // Must be true on HTTPS (Render)
      sameSite: isProduction ? "none" : "lax", // "none" allows cross-domain cookies over HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "User Logged in Successfully ✅",
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const verify = async (req, res) => {
  return res.status(200).json({
    authenticated: true,
    role: req.user.role,
    isBanned: req.user.isBanned,
    isVerified: req.user.isVerified,
  });
};

const logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  return res.status(200).json({
    message: "Logged Out Successfully ✅",
  });
};

const getItems = async (req, res) => {
  try {
    if (req.user.isBanned) {
      return res.status(401).json({
        message: "User Is banned!",
      });
    }
    const page = Number(req.query.page) || 1;
    const PAGE_SIZE = 12;
    const { search, category } = req.query;
    let filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }
    //* case-insensitive regex search on product name
    if (search && search.trim() !== "") {
      filter.name = { $regex: search.trim(), $options: "i" };
    }

    const items = await itemsModel
      .find(filter)
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);
    const totalProducts = await itemsModel.countDocuments(filter);
    res.status(200).json({
      message: "Fetch Successful ✅",
      items,
      totalProducts,
    });
  } catch (error) {
    console.error("Fetch Items Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const oAuthStart = async (req, res) => {
  try {
    const client = getGoogleClient();
    const url = client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: ["openid", "email", "profile"],
    });
    return res.redirect(url);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const oAuthCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ message: "Missing Code in CallBack" });
  }
  try {
    const client = getGoogleClient();
    const { tokens } = await client.getToken(code);
    if (!tokens.id_token) {
      return res.status(400).json({
        message: "No google id_token found!",
      });
    }
    //* Verify Token and get user info
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.OAUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload?.email;
    const emailVerified = payload?.email_verified;
    if (!email || !emailVerified) {
      return res.status(400).json({
        message: "Email verification failed!",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    //* Username
    const googleName = payload?.name || payload?.given_name;
    const emailUsername = normalizedEmail.split("@")[0];
    const baseUsername = (googleName || emailUsername).toLowerCase().replace(/[^a-z0-9_]/g, "");
    // Add a short random suffix to guarantee uniqueness in your database
    const username = `${baseUsername}_${crypto.randomBytes(2).toString("hex")}`;
    let user = await userModel.findOne({ email: normalizedEmail });
    if (!user) {
      const randomPass = crypto.randomBytes(16).toString("hex");
      const password = await bcrypt.hash(randomPass, 10);
      user = await userModel.create({
        username,
        email: normalizedEmail,
        role: "user",
        password,
        isVerified: true,
      });
      sendGoogleWelcomeEmail(normalizedEmail, username);
    } else {
      if (!user.isVerified) {
        user.isVerified = true;
        await user.save();
      }
    }
    const token = generateToken({
      id: user._id,
      role: user.role,
      isBanned: user.isBanned,
      isVerified: user.isVerified,
    });
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // Must be true on HTTPS (Render)
      sameSite: isProduction ? "none" : "lax", // "none" allows cross-domain cookies over HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "");
    if (!clientUrl) {
      return res.status(500).json({
        message: "Client url missing!",
      });
    }
    return res.redirect(`${clientUrl}/`);
  } catch (err) {
    console.error("[Google OAuth Error]:", err);
    const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "");
    return res.redirect(clientUrl);
  }
};
const forgotPass = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Email is required!",
    });
  }
  const normalizedEmail = email.toLowerCase().trim();
  try {
    let user = await userModel.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If a user with this email exists, we'll send u an email",
      });
    }
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    user.resetPasswordToken = tokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 1000 * 60);
    await user.save();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);
    return res.status(200).json({
      success: true,
      message: "If a user with this email exists, we'll send u an email",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server Error, Plz retry later!",
    });
  }
};
const resetPass = async (req, res) => {
  const { email, token, newPassword } = req.body;
  if (!token) {
    return res.status(400).json({
      message: "Reset Token is missing!",
    });
  }
  if (!newPassword || newPassword.length < 8 || newPassword.length > 20) {
    return res.status(400).json({
      message: "Password must be minimum 8 and maximum 20 character long!",
    });
  }
  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const normalizedEmail = email ? email.toLowerCase().trim() : "";
    const user = await userModel.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: new Date() },
      email: normalizedEmail,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token! Plz retry",
      });
    }
    const newPass = await bcrypt.hash(newPassword, 10);
    user.password = newPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password Changed Successfully!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server Error!",
    });
  }
};
module.exports = {
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
};
