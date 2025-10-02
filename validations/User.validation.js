const joi = require("joi");

class SignupValidation {
  signupValidate = async (req, res, next) => {
    const schema = joi.object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().required(),
      phone: joi.string().required(),
      designation: joi.string().allow(null, ""),
      profilePicture: joi.string().allow(null, ""),
      bio: joi.string().allow(null, ""),
      country: joi.string().allow(null, ""),
      city: joi.string().allow(null, ""),
      state: joi.string().allow(null, ""),
      postalCode: joi.string().allow(null, ""),
      taxId: joi.string().allow(null, ""),
      password: joi.string().allow(null, ""),
      facebook: joi.string().allow(null, ""),
      xcom: joi.string().allow(null, ""),
      linkedin: joi.string().allow(null, ""),
      instagram: joi.string().allow(null, ""),
      role: joi.string().allow(),
      organisationId: joi.number().allow(null, ""),
      organisationName: joi.string().allow(null, ""),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      await res.status(400).json({ error: error.details[0].message });
    }
  };
  getUserByIdValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
    });
    try {
      await schema.validateAsync(req.params);
      next();
    } catch (error) {
      await res.status(400).json({ error: error.details[0].message });
    }
  };
  getUserListValidate = async (req, res, next) => {
    const schema = joi.object({
      page: joi.number(),
      limit: joi.number(),
      keyword: joi.string().allow(""),
    });
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      await res.status(400).json({ error: error.details[0].message });
    }
  };
  getOrganisationsUserListValidate = async (req, res, next) => {
    const schema = joi.object({
      page: joi.number(),
      limit: joi.number(),
      keyword: joi.string().allow(""),
    });
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      await res.status(400).json({ error: error.details[0].message });
    }
  };
  getUsersValidate = async (req, res, next) => {
    const schema = joi.object({
      keyword: joi.string().allow(""),
    });
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      await res.status(400).json({ error: error.details[0].message });
    }
  };
  getTotalcountValidate = async (req, res, next) => {
    const schema = joi.object({});
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      await res.status(400).json({ error: error.details[0].message });
    }
  };
  updateUserValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().required(),
      phone: joi.string().required(),
      designation: joi.string().allow(null, ""),
      profilePicture: joi.string().allow(null, ""),
      bio: joi.string().allow(null, ""),
      country: joi.string().allow(null, ""),
      city: joi.string().allow(null, ""),
      state: joi.string().allow(null, ""),
      postalCode: joi.string().allow(null, ""),
      taxId: joi.string().allow(null, ""),
      password: joi.string().allow(null, ""),
      facebook: joi.string().allow(null, ""),
      xcom: joi.string().allow(null, ""),
      linkedin: joi.string().allow(null, ""),
      instagram: joi.string().allow(null, ""),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      await res.status(400).json({ error: error.details[0].message });
    }
  };
  updateUserStatusValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      status: joi.string().required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      await res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new SignupValidation();
