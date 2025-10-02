// validations/Review.validation.js
const joi = require('joi');

class ReviewValidation {
  // Validation for submitting a new review
  submitReviewValidate = async (req, res, next) => {
    const schema = joi.object({
      userId: joi.number().integer().required(), // Ensure userId is provided
      courseId: joi.number().integer().optional(), // courseId can be optional
      rating: joi.number().integer().min(1).max(5).required(),
      comment: joi.string().min(5).max(1000).required(), // Add min/max length as appropriate
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  // Validation for approving or deleting a review by ID (from body)
  reviewIdValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      isApproved: joi.boolean().optional(), // Optional for approve action
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new ReviewValidation();