const joi = require("joi");

class PackageValidation {
  addPackageValidate = async (req, res, next) => {
    const schema = joi.object({
      packageName: joi.string().required(),
      packagePrice: joi.number(),
      description: joi.string(),
      features: joi.array(),
      status: joi.boolean(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  getPackageByIdValidate = async (req, res, next) => {
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

  getPackageListValidate = async (req, res, next) => {
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

  updatePackageValidate = async (req, res, next) => {
    console.log("🚀 ~ PackageValidation ~ req:", req.body)
    const schema = joi.object({
      id: joi.number().required(),
      packageName: joi.string(),
      packagePrice: joi.number(),
      description: joi.string(),
      features: joi.array(),
      status: joi.boolean(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };

  updatePackageStatusValidate = async (req, res, next) => {
    const schema = joi.object({
      id: joi.number().required(),
      status: joi.boolean().required(),
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
}

module.exports = new PackageValidation();
