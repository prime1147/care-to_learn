const joi = require("joi");

class LectureValidation {
  addLectureValidate = async (req, res, next) => {
    const schema = joi.object({
      title: joi.string().required(),
      sectionId: joi.number().required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  getLectureByIdValidate = async (req, res, next) => {
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

  getLectureListValidate = async (req, res, next) => {
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

  updateLectureValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      title: joi.string().optional(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new LectureValidation();
