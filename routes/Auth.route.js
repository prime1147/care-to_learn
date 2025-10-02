const router = require("express").Router();

const {
  loginValidate,
  forgotpasswordValidate,
  resetpasswordValidate,
  verifyTokenValidate,
  verifyEmailValidate,
  verifyPhoneValidate,
  verifyOtpValidate,
} = require("../validations/Auth.validation");

const {
  login,
  forgotpassword,
  resetpassword,
  verifyToken,
  verifyEmail,
  sendOtp,
  verifyOtp,
  generateOtpSecret,
  verifyOtpSecret,
} = require("../controllers/Auth.controller");

router.post("/login", loginValidate, login);
router.post("/forgot-password", forgotpasswordValidate, forgotpassword);
router.put("/reset-password", resetpasswordValidate, resetpassword);
router.get("/verify-token", verifyTokenValidate, verifyToken);
router.post("/verify-email", verifyEmailValidate, verifyEmail);
router.post("/send-otp", verifyPhoneValidate, sendOtp);
router.post("/verify-otp", verifyOtpValidate, verifyOtp);
router.post("/generate-secret", generateOtpSecret);
router.post("/verify-secretotp", verifyOtpSecret);
module.exports = router;
