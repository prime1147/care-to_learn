const joi = require("joi");

class CourseValidation {
  addCourseValidate = async (req, res, next) => {
    const schema = joi.object({
      title: joi.string().required(),
      subtitle: joi.string().required(),
      description: joi.string(),
      language: joi.string(),
      level: joi.string().valid("Beginner", "Intermediate", "Advanced"),
      category: joi.string(),
      aim: joi.string(),
      learningOutcome: joi.string(),
      status: joi.string().valid("ACTIVE", "INACTIVE"),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  getCourseByIdValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
    });
    try {
      await schema.validateAsync(req.params);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  getCourseListValidate = async (req, res, next) => {
    const schema = joi.object({
      page: joi.number().min(1).optional(),
      limit: joi.number().min(1).optional(),
      keyword: joi.string().allow("").optional(),
      category: joi.string().optional(),
      status: joi.string().valid("ACTIVE", "INACTIVE").optional(),
    });
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  updateCourseValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      title: joi.string(),
      subtitle: joi.string(),
      description: joi.string(),
      language: joi.string(),
      level: joi.string().valid("Beginner", "Intermediate", "Advanced"),
      category: joi.string(),
      aim: joi.string(),
      learningOutcome: joi.string(),
      status: joi.string().valid("ACTIVE", "INACTIVE"),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  updateCourseStatusValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      status: joi.string().valid("ACTIVE", "INACTIVE").required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new CourseValidation();
