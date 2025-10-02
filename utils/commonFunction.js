const nodemailer = require("nodemailer");
require("dotenv").config();
const urlCache = new Map();

class CommonFunctions {
  async generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }
  async sendEmail(message) {
    try {
      message.from = process.env.SMTP_FROM;
      let transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465, // auto match port
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      const info = await transport.sendMail(message);
      return {
        success: true,
        data: info,
      };
    } catch (error) {
      console.error("❌ sendEmail error:", error);
      return {
        success: false,
        data: error,
      };
    }
  }

  async getCachedPresignedUrl(fileController, key, expiresIn = 300) {
    if (
      key == null ||
      key.startsWith("http://") ||
      key.startsWith("https://")
    ) {
      return key; // return as-is (already a full URL)
    }
    const cached = urlCache.get(key);

    if (cached && Date.now() < cached.expiresAt) {
      console.log("🚀 ~ getCachedPresignedUrl ~ using cached URL");
      return cached.url;
    }

    const { cdnUrl } = await fileController.generatePresignedUrl(
      key,
      expiresIn
    );

    urlCache.set(key, {
      url: cdnUrl,
      expiresAt: Date.now() + expiresIn * 1000,
    });

    return cdnUrl;
  }
}

module.exports = new CommonFunctions();