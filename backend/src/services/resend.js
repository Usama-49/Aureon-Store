const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const welcomeEmailTemplate = (userName = "there") => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Aureon Store</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f6f8; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
          
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #2563eb; padding: 28px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">
                AUREON STORE
              </h1>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 30px;">
              <h2 style="color: #111827; font-size: 20px; font-weight: 700; margin: 0 0 16px 0;">
                Welcome Aboard ${userName}! 🚀
              </h2>
              
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
                We're thrilled to have you join us. Your account has been successfully created, giving you full access to explore our platform, manage orders, and enjoy a seamless shopping experience.
              </p>

              <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 28px 0;">
                Click below to sign in and start exploring your account dashboard:
              </p>

              <!-- Call to Action Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto 28px auto;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #2563eb;">
                    <a href="#" target="_blank" style="font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
                      Explore Aureon Store ↗
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Secondary Info Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px;">
                <tr>
                  <td style="color: #1e40af; font-size: 13px; line-height: 1.5; text-align: center;">
                    💡 <strong>Pro Tip:</strong> Keep your credentials secure and never share your password with anyone.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 6px 0;">
                © 2026 Aureon Store. All rights reserved.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Need help? Contact us at <a href="mailto:ur2749@gmail.com" style="color: #2563eb; text-decoration: none;">ur2749@gmail.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const sendRegistrationEmail = async ( userMail, userName ) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Aureon Store <onboarding@resend.dev>",
      to: [userMail],
      subject: "🎉 Welcome Aboard the Aureon Experience!",
      html: welcomeEmailTemplate(userName),
    });

    if (error) {
      console.error("Error sending email via Resend:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Email Service Exception:", err);
    throw err;
  }
};

module.exports = { sendRegistrationEmail };
