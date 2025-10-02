const joi = require("joi");

class ProjectValidation {
  addProjectValidate = async (req, res, next) => {
    const schema = joi.object({
      title: joi.string().max(255).required(),
      description: joi.string().optional(),
    });

    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  getProjectByIdValidate = async (req, res, next) => {
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

  getProjectListValidate = async (req, res, next) => {
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

  updateProjectValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      title: joi.string().max(255).optional(),
      description: joi.string().optional(),
    });

    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new ProjectValidation();
