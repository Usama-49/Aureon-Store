const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized ❌",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized ❌",
    });
  }
};

const optionalVerifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.user = null; // Guest user
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Logged-in user
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};

const requireVerified = (req, res, next) => {
  if (!req.user?.isVerified) {
    return res.status(403).json({
      message: "Forbidden: Please verify your email to perform this action.",
    });
  }
  next();
};

module.exports = { verifyToken, optionalVerifyToken, requireVerified };
