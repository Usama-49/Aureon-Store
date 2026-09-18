const { google } = require("googleapis");
require("dotenv").config();

const OAuth2 = google.auth.OAuth2;

/**
 * Sends registration email using Google's raw HTTPS REST API.
 * Bypasses SMTP port blocks entirely.
 */
const sendRegistrationEmail = async (userMail, verifyUrl) => {
  try {
    const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN, EMAIL_USER } = process.env;

    if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET || !OAUTH_REFRESH_TOKEN || !EMAIL_USER) {
      throw new Error("[Email Service] Missing required OAuth2 environment variables.");
    }

    const oauth2Client = new OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground",
    );

    oauth2Client.setCredentials({
      refresh_token: OAUTH_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // Format UTF-8 Subject line for base64 encoding
    const utf8Subject = `=?utf-8?B?${Buffer.from("🎉 Welcome Aboard the Aureon Experience!").toString("base64")}?=`;

    // Construct raw MIME email header and body
    const messageParts = [
      `From: "Aureon Store" <${EMAIL_USER}>`,
      `To: ${userMail}`,
      `Content-Type: text/html; charset=utf-8`,
      `MIME-Version: 1.0`,
      `Subject: ${utf8Subject}`,
      "",
      `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 28px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
  <h2 style="color: #111827; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 12px; text-align: center;">Welcome to Aureon Store! 🎉</h2>
  
  <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
    Thanks for signing up! We're excited to have you on board. Please verify your email address to activate your account and unlock full access to Aureon.
  </p>

  <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 12px 16px; border-radius: 4px; margin-bottom: 24px;">
    <p style="color: #c2410c; font-size: 13px; margin: 0; font-weight: 500;">
      ⏳ <strong>Note:</strong> This verification link will expire in <strong>30 minutes</strong> for security reasons.
    </p>
  </div>

  <div style="text-align: center; margin: 28px 0;">
    <a href="${verifyUrl}" target="_blank" style="background-color: #f97316; color: #ffffff; padding: 12px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; text-decoration: none; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      Verify Account
    </a>
  </div>

  <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin-bottom: 24px;">
    If the button above doesn't work, copy and paste this link directly into your browser:
    <br>
    <a href="${verifyUrl}" style="color: #f97316; word-break: break-all; text-decoration: underline;">${verifyUrl}</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0 16px 0;">
  <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center;">
    If you didn't create an account with Aureon Store, you can safely ignore this email.
  </p>
</div>`,
    ];

    const message = messageParts.join("\n");

    // Convert raw message to URL-safe Base64 format required by Google API
    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log("[Email Service SUCCESS] Dispatched via Gmail API:", response.data.id);
    return response.data;
  } catch (err) {
    console.error("[Email Service FAILED]:", err);
    throw err;
  }
};

module.exports = { sendRegistrationEmail };
