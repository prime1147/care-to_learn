const joi = require("joi");

class CourseTopicValidation {
  addCourseTopicValidate = async (req, res, next) => {
    const schema = joi.object({
      courseId: joi.number(),
      title: joi.string(),
      description: joi.string(),
      url: joi.string(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  getCourseTopicByIdValidate = async (req, res, next) => {
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

  getCourseTopicListValidate = async (req, res, next) => {
    const schema = joi.object({
      page: joi.number().min(1).optional(),
      limit: joi.number().min(1).optional(),
      keyword: joi.string().allow("").optional(),
      courseId: joi.number().optional(),
    });
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  updateCourseTopicValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      title: joi.string().optional(),
      description: joi.string().optional(),
      url: joi.string().optional(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new CourseTopicValidation();
