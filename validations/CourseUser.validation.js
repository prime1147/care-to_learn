const joi = require("joi");

class CourseUserValidation {
  addCourseUserValidate = async (req, res, next) => {
    const schema = joi.object({
      courseId: joi.number().required(),
      users: joi.array(),
      status: joi.string().valid("ACTIVE", "INACTIVE").optional(),
      Budget: joi.number().optional(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  getCourseUserByIdValidate = async (req, res, next) => {
    const schema = joi.object({
      courseId: joi.number().required(),
    });
    try {
      await schema.validateAsync(req.params);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
  deleteCourseUserByIdValidate = async (req, res, next) => {
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
  getCourseUserListValidate = async (req, res, next) => {
    const schema = joi.object({
      page: joi.number().min(1).optional(),
      limit: joi.number().min(1).optional(),
      keyword: joi.string().allow("").optional(),
    });
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  updateCourseUserValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      startDate: joi.date().optional(),
      endDate: joi.date().optional(),
      status: joi.string().valid("ACTIVE", "INACTIVE").optional(),
      Budget: joi.number().optional(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new CourseUserValidation();
