const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const getGoogleClient = () => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientSecret || !clientId || !redirectUri) {
    throw new Error("Google Client-id or Client-secret missing!");
  }
  return new OAuth2Client(clientId, clientSecret, redirectUri);
};
const generateToken = (payload) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing!");
  }
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { getGoogleClient, generateToken };
