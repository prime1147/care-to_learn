const joi = require("joi");

class FAQValidation {
  // Add FAQ
  addFAQValidate = async (req, res, next) => {
    const schema = joi.object({
      question: joi.string().required(),
      answer: joi.string().required(),
      isActive: joi.boolean().optional(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  // Get FAQ by ID
  getFAQByIdValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
    });
    try {
      console.log("Delete faq"),
        await schema.validateAsync(req.params);
      next();
    } catch (error) {
      console.log('error:1 ', error);
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  // List FAQs
  getFAQListValidate = async (req, res, next) => {
    const schema = joi.object({
      page: joi.number().min(1).optional(),
      limit: joi.number().min(1).optional(),
      keyword: joi.string().allow("").optional(),
      isActive: joi.boolean().optional(),
    });
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  // Update FAQ
  updateFAQValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      question: joi.string().optional(),
      answer: joi.string().optional(),
      isActive: joi.boolean().optional(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  // Toggle FAQ status
  toggleFAQStatusValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      isActive: joi.boolean().required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new FAQValidation();
