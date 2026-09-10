const userModel = require("../models/user.model");
const itemsModel = require("../models/items.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendRegistrationEmail } = require("../services/resend");
require("dotenv").config();

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
    //* Send registration email ...
    const verifyToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      },
    );
    const verifyUrl = `${process.env.APP_URL}/auth/verify-email?token=${verifyToken}`;
    await sendRegistrationEmail(email, verifyUrl);
    return res.status(201).json({
      success: true,
      message: "User Created ✅",
      role: user.role,
    });
  } catch (error) {
    console.log(error);
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
    const token = jwt.sign(
      { id: user._id, role: user.role, isBanned: user.isBanned, isVerified: user.isVerified },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
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
  res.clearCookie("token");
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
    const items = await itemsModel
      .find()
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);
    const totalProducts = await itemsModel.countDocuments();
    res.status(200).json({
      message: "Fetch Successful ✅",
      items,
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = { register, login, getItems, verify, logout, verifyEmail };
