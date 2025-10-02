// validations/DemoSession.validation.js
const Joi = require("joi"); // Assuming Joi is installed and used

class DemoSessionValidation {
  /**
   * Validation schema for booking a new demo session.
   * Applies to the request body.
   */
  bookDemoValidate = async (req, res, next) => {
    const schema = Joi.object({
      full_name: Joi.string().trim().min(3).max(100).required().messages({
        "string.base": "Full name must be a string.",
        "string.empty": "Full name cannot be empty.",
        "string.min":
          "Full name should have a minimum length of {#limit} characters.",
        "string.max":
          "Full name should have a maximum length of {#limit} characters.",
        "any.required": "Full name is required.",
      }),

      email: Joi.string().email().required().messages({
        "string.base": "Email must be a string.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Email must be a valid email address.",
        "any.required": "Email is required.",
      }),

      phone_number: Joi.string()
        .trim()
        .pattern(/^[0-9]{10,15}$/) // Example: 10-15 digits
        .required()
        .messages({
          "string.base": "Phone number must be a string.",
          "string.empty": "Phone number cannot be empty.",
          "string.pattern.base":
            "Phone number must be a valid number (10-15 digits).",
          "any.required": "Phone number is required.",
        }),

      preferred_date: Joi.date()
        .iso() // Ensures date is in ISO 8601 format (YYYY-MM-DD)
        .min("now") // Ensures the date is today or in the future
        .required()
        .messages({
          "date.base": "Preferred date must be a valid date.",
          "date.iso": "Preferred date must be in YYYY-MM-DD format.",
          "date.min": "Preferred date cannot be in the past.",
          "any.required": "Preferred date is required.",
        }),

      preferred_time: Joi.string().trim().required().messages({
        "string.base": "Preferred time must be a string.",
        "string.empty": "Preferred time cannot be empty.",
        "any.required": "Preferred time is required.",
      }),

      message: Joi.string().trim().max(500).optional().allow("").messages({
        "string.base": "Message must be a string.",
        "string.max":
          "Message should have a maximum length of {#limit} characters.",
      }),

      // Uncomment if your demo sessions are linked to courses and course_id is passed in the body
      // course_id: Joi.number().integer().min(1).optional()
    });

    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  /**
   * Validation schema for getting a single demo session by ID.
   * Applies to request parameters.
   */
  getDemoSessionByIdValidate = async (req, res, next) => {
    const schema = Joi.object({
      id: Joi.number().integer().required(),
    });
    try {
      await schema.validateAsync(req.params);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  /**
   * Validation schema for updating a demo session.
   * Applies to the request body.
   */
  updateDemoSessionValidate = async (req, res, next) => {
    const schema = Joi.object({
      // id is from params, not body for update, so omitted here
      status: Joi.string()
        .valid("pending", "confirmed", "cancelled", "completed")
        .optional()
        .messages({
          "any.only":
            'Status must be one of "pending", "confirmed", "cancelled", or "completed".',
        }),
      full_name: Joi.string().trim().min(3).max(100).optional(),
      email: Joi.string().email().optional(),
      phone_number: Joi.string()
        .trim()
        .pattern(/^[0-9]{10,15}$/)
        .optional(),
      preferred_date: Joi.date().iso().min("now").optional(),
      preferred_time: Joi.string().trim().optional(),
      message: Joi.string().trim().max(500).optional().allow(""),
      // course_id: Joi.number().integer().min(1).optional(),
    }).min(1); // At least one field must be provided for update

    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  /**
   * Validation schema for getting a list of demo sessions (e.g., for admin panel).
   * Applies to query parameters.
   */
  getDemoSessionListValidate = async (req, res, next) => {
    const schema = Joi.object({
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional(),
      keyword: Joi.string().allow("").optional(), // For searching by name, email, etc.
      status: Joi.string()
        .valid("pending", "confirmed", "cancelled", "completed")
        .optional(), // Filter by status
    });
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new DemoSessionValidation();
