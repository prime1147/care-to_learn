const joi = require("joi");

class AuthValidation {
  loginValidate = async (req, res, next) => {
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    });

    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      await res.status(400).json({ error: error.details[0].message });
    }
  };
  resetpasswordValidate = async (req, res, next) => {
    const schema = joi.object({
      token: joi.string().required(),
      newpassword: joi.string().required(),
      confirmpassword: joi.string().required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
  forgotpasswordValidate = async (req, res, next) => {
    const schema = joi.object({
      email: joi.string().required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
  verifyTokenValidate = async (req, res, next) => {
    const schema = joi.object({
      token: joi.string().required(),
    });
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
  verifyEmailValidate = async (req, res, next) => {
    const schema = joi.object({
      email: joi.string().email().required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
  verifyPhoneValidate = async (req, res, next) => {
    const schema = joi.object({
      phone: joi
        .string()
        .pattern(/^[6-9]\d{9}$/)
        .required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
  verifyOtpValidate = async (req, res, next) => {
    const schema = joi.object({
      phone: joi
        .string()
        .pattern(/^[6-9]\d{9}$/)
        .required(),
      otp: joi.string().length(6).required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new AuthValidation();
