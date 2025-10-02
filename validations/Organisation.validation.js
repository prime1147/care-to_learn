const joi = require("joi");

class OrganisationValidation {
  addOrganisationValidate = async (req, res, next) => {
    const schema = joi.object({
      name: joi.string().required(),
      organisationName: joi.string(),
      email: joi.string().required(),
      mobile: joi.string().required(),
      password: joi.string().required(),
      profilePicture: joi.string(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  getOrganisationByIdValidate = async (req, res, next) => {
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

  getOrganisationListValidate = async (req, res, next) => {
    const schema = joi.object({
      page: joi.number().min(1).optional(),
      limit: joi.number().min(1).optional(),
      keyword: joi.string().allow("").optional(),
      isActive: joi.boolean().valid(true, false).optional(),
    });
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  updateOrganisationValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      title: joi.string(),
      name: joi.string(),
      organisationName: joi.string(),
      email: joi.string(),
      mobile: joi.string(),
      password: joi.string(),
      profilePicture: joi.string(),
      isActive: joi.boolean().valid(true, false).optional(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  updateOrganisationStatusValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      isActive: joi.boolean().valid(true, false).required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new OrganisationValidation();
