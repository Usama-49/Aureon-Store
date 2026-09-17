const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const { EMAIL_USER, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = process.env;
  if (!EMAIL_USER || !OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET || !OAUTH_REFRESH_TOKEN) {
    throw new Error("[Email Service] Missing required OAuth2 environment variables in .env");
  }
  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground",
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err || !token) {
        reject(err || new Error("Failed to generate access token"));
      } else {
        resolve(token);
      }
    });
  });

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken,
    },
  });
};

const sendRegistrationEmail = async (userMail, verifyUrl) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"Aureon Store" <${process.env.EMAIL_USER}>`,
      to: userMail,
      subject: "🎉 Welcome Aboard the Aureon Experience!",
      html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;">
      <h2 style="color: #111827; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 12px;">Welcome aboard!</h2>
      <p style="color: #4b5563; font-size: 15px; line-height: 1.5; margin-bottom: 24px;">
        Thanks for signing up. Please verify your email address to activate your account and get started.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verifyUrl}" target="_blank" style="background-color: #f97316; color: #ffffff; padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; text-decoration: none; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          Verify Account
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0 16px 0;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center;">
        If you didn't create an account, you can safely ignore this email.
      </p>
    </div>
  `,
    });

    return info;
  } catch (err) {
    console.error("[Email Service] Failed:", err);
    throw err;
  }
};

module.exports = { sendRegistrationEmail };
