const joi = require("joi");

class ContactUsValidation {
  addContactUsValidate = async (req, res, next) => {
    const schema = joi.object({
     name: joi.string().min(3).max(50).required(),
  email: joi.string().email().required(),
  phone: joi.string()
    .pattern(/^[0-9]{10,15}$/) // only digits, 10–15 length
    .required(),
  type: joi.string().valid("individual", "organization").required(),
  message: joi.string().min(10).max(1000).required()
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
    updateStatusValidate = async (req, res, next) => {
    const schema = joi.object({
      status: joi.string().valid("new", "reviewed", "resolved").required(),
    });

    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Validation Error",
        errors: error.details.map((err) => err.message),
      });
    }
  };

  // List with pagination + search
  listValidate = async (req, res, next) => {
    const schema = joi.object({
      page: joi.number().integer().min(1).default(1),
      limit: joi.number().integer().min(1).max(100).default(10),
      keyword: joi.string().allow("", null),
    });

    try {
      await schema.validateAsync(req.query, { abortEarly: false });
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Validation Error",
        errors: error.details.map((err) => err.message),
      });
    }
  };
}


module.exports = new ContactUsValidation();