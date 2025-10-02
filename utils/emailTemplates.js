require('dotenv').config()
module.exports.forgotPasswordTemplate = data => {
  const { fullName, token } = data
  return `<html>
    <center>
    <h2>Forgot your password?</h2>
    <p> Hi ${fullName} click on the button below to reset your password.\n\n</p>
    <a href="${process.env.FORGOT_PASSWORD_LINK}?token=${token}" style="background-color: Orange; border: none; color: white; padding: 15px 60px; text-align: center; text-decoration: none;
    display: inline-block; font-size: 16px;">RESET YOUR PASSWORD</a>
    </center>
    </html>`
}
module.exports.verifyEmailTemplate = (data) => {
  const { fullName, token } = data;
  return `<html>
    <center>
      <h2>Verify your email address</h2>
      <p>Hi ${fullName},</p>
      <p>Thank you for signing up. Please click the button below to verify your email address:</p>
      <a href="${process.env.VERIFY_EMAIL_LINK}?token=${token}" 
         style="background-color: green; border: none; color: white; padding: 12px 40px; 
         text-align: center; text-decoration: none; font-size: 16px; border-radius: 5px;">
         VERIFY EMAIL
      </a>
      <p>If you did not create this account, you can ignore this email.</p>
    </center>
  </html>`;
};

module.exports.phoneOtpTemplate = (data) => {
  const { otp } = data;
  return `Your verification code is ${otp}. It is valid for 10 minutes. Do not share this with anyone.`;
};

module.exports.contactUsTemplate = (data) => {
  const { name, email, phone, type, message } = data;
  return `<html>
    <center style="font-family: Arial, sans-serif;">
      <h2 style="color: #333;">📩 New Contact Us Message</h2>
      <table style="border-collapse: collapse; margin: 20px auto; width: 80%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>Name:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>Email:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>Phone:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${phone}</td>
        </tr>
         <tr>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>User Type:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${type}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc; vertical-align: top;"><strong>Message:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${message}</td>
        </tr>
      </table>
      <p style="color: #666;">This message was submitted from the Contact Us form on your LMS.</p>
    </center>
  </html>`;
};


module.exports.contactUsResponseTemplate = (data) => {
  const { name, type } = data;

  return `
  <html>
    <center style="font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4CAF50; color: #fff; padding: 20px;">
          <h2 style="margin: 0;">Thank You for Contacting Us</h2>
        </div>
        <div style="padding: 20px; text-align: left; color: #333;">
          <p>Hi <strong>${name}</strong>,</p>
          <p>We’ve received your message through our <strong>Contact Us</strong> form.</p>
          <p>Our support team will review your request and get back to you as soon as possible. 
          Depending on the nature of your inquiry (${type}), response times may vary.</p>
          <p>We appreciate your patience and will make sure you hear from us shortly.</p>
          
          <p style="margin-top: 20px;">Best regards,</p>
          <p><strong>The LMS Support Team</strong></p>
        </div>
        <div style="background-color: #f9f9f9; color: #777; padding: 15px; font-size: 12px; text-align: center;">
          <p>This is an automated confirmation email. Please do not reply directly to this email.</p>
        </div>
      </div>
    </center>
  </html>
  `;
};

