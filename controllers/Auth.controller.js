const response = require("../utils/response");
const { sign, verify } = require("../utils/jwtHelper");
const bcrypt = require("bcrypt");
const UserService = require("../services/User.service");
const Templates = require("../utils/emailTemplates");
const { sendEmail, generateOtp } = require("../utils/commonFunction");
// const redis = require('../config/redisClient');
const commonFunction = require("../utils/commonFunction");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
let users = {};

class Auth {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const payload = {
        where: {
          email,
        },
      };

      let getUser = await UserService.getById(payload);
      if (!getUser) {
        return response.respondBad("Invalid credentials", res);
      }
      const comparePassword = await bcrypt.compare(password, getUser.password);
      if (!comparePassword) {
        return response.respondBad("Invalid password", res);
      }
      let { id, firstName, lastName, role, phone } = getUser;
      const fullName = `${firstName} ${lastName}`;

      const token = sign({
        email: email,
        phone: phone,
        id: id,
        role: role,
      });
      return response.respondGet(
        {
          token: token,
          email: email,
          phone: phone,
          id: id,
          fullName: fullName,
          role: role,
        },
        res
      );
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  }
  async forgotpassword(req, res, next) {
    try {
      const { email } = req.body;
      const result = await UserService.getById({
        where: {
          email: email,
        },
      });
      let EMAIL_NOT_FOUND =
        " is not associated with this account. Double-check your email address and try again.";
      if (!result) {
        return response.respondBad(`${email} ${EMAIL_NOT_FOUND}`, res);
      }
      let { firstName, lastName, id } = result;
      const payload = {
        email: result.email,
        id: id,
      };
      const token = sign(payload);
      const mailOptions = {
        to: email,
        subject: "Password change request",
        html: Templates.forgotPasswordTemplate({
          fullName: `${firstName} ${lastName}`,
          token,
        }),
      };
      // const mailResponse = await sendEmail(mailOptions);

      // if (!mailResponse) return response.respondBad("Bad Request", res);
      let PASSWORD_LINK = "A password reset link has been sent to";

      return response.respondGet(
        { message: `${PASSWORD_LINK} ${email}`, mailOptions: mailOptions },
        res
      );
    } catch (err) {
      return response.respondError(err, res);
    }
  }
  async verifyToken(req, res, next) {
    try {
      const { token } = req.query;
      const decoded = verify(token);
      if (!decoded) return apiController.respondBad("Invalid token");
      const uData = await UserService.getById({
        where: {
          email: decoded.email,
        },
      });
      return response.respondGet(
        [
          {
            email: uData.email,
          },
        ],
        res
      );
    } catch (err) {
      return apiController.respondError(err);
    }
  }
  async resetpassword(req, res, next) {
    try {
      const { token, newpassword, confirmpassword } = req.body;

      const decodedobj = verify(token);
      if (!decodedobj) {
        return response.respondBad("Token is not valid", res);
      }

      const uData = await UserService.getById({
        where: { email: decodedobj.email },
      });

      if (!uData) {
        return response.respondBad("Invalid User", res);
      }

      const matchPassword = await bcrypt.compare(newpassword, uData.password);
      if (matchPassword) {
        return response.respondBad(
          "New password must be different from old one",
          res
        );
      }

      if (newpassword !== confirmpassword) {
        return response.respondBad(
          "New password and confirm password do not match",
          res
        );
      }

      await UserService.put(
        { password: newpassword },
        {
          where: { id: uData.id },
        }
      );

      return response.respondPut("Password updated successfully", res);
    } catch (err) {
      console.log("🚀 ~ Auth ~ resetpassword ~ err:", err);
      return response.respondError(err, res);
    }
  }
  async verifyEmail(req, res, next) {
    try {
      const { email } = req.body;
      const findUser = {
        where: {
          email: email,
        },
      };
      let getUser = await UserService.getById(findUser);
      if (!getUser) {
        return response.respondBad("User Does not exist", res);
      }

      let { fullName, id } = getUser;
      const payload = {
        email: getUser.email,
        id: id,
      };
      const token = sign(payload);
      const mailOptions = {
        to: email,
        subject: "Email Verification",
        html: Templates.verifyEmailTemplate({ fullName, token }),
      };
      const mailResponse = await sendEmail(mailOptions);

      if (!mailResponse) return response.respondBad("Bad Request", res);
      let PASSWORD_LINK = "A password reset link has been sent to";

      return response.respondGet({ message: `${PASSWORD_LINK} ${email}` }, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  }
  //send otp to phone number for verification
  async sendOtp(req, res, next) {
    try {
      const { phone } = req.body;

      const findUser = {
        where: { phone },
      };

      const getUser = await UserService.getById(findUser);
      if (!getUser) {
        return response.respondBad("User does not exist", res);
      }

      const otp = await commonFunction.generateOtp();
      console.log("otp: ", otp);
      await redis.setex(`otp:${phone}`, 600, otp);

      const smsMessage = Templates.phoneOtpTemplate({ otp });
      // const smsResponse = await sendSMS(phone, smsMessage);

      // if (!smsResponse) return response.respondBad('Failed to send OTP', res);

      return response.respondGet(
        { message: `OTP ${otp} sent to ${phone}` },
        res
      );
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  }
  async verifyOtp(req, res) {
    const { phone, otp } = req.body;

    const savedOtp = await redis.get(`otp:${phone}`);
    if (!savedOtp) return response.respondBad("OTP expired or invalid", res);

    if (savedOtp !== otp) return response.respondBad("Incorrect OTP", res);

    // Clear OTP after successful verification
    await redis.del(`otp:${phone}`);

    return response.respondGet(
      { message: "Phone number verified successfully" },
      res
    );
  }
  //Google Authenticator OTP generation and verification
  async generateOtpSecret(req, res) {
    const { identifier } = req.body; // can be email or phone
    if (!identifier) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const secret = speakeasy.generateSecret({
      name: `MyApp-(${identifier})`,
    });

    users[identifier] = {
      secret: secret.base32,
    };

    const qrDataURL = await qrcode.toDataURL(secret.otpauth_url);

    return res.json({
      message: "Scan the QR code using Google Authenticator",
      qrCode: qrDataURL,
      secret: secret.base32,
    });
  }

  async verifyOtpSecret(req, res) {
    const { identifier, token } = req.body;

    if (!identifier || !token) {
      return res
        .status(400)
        .json({ error: "Identifier and OTP token are required" });
    }

    const user = users[identifier];
    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found or secret not set" });
    }

    const isVerified = speakeasy.totp.verify({
      secret: user.secret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (isVerified) {
      return res.json({ message: "OTP verified successfully." });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  }
}
module.exports = new Auth();
