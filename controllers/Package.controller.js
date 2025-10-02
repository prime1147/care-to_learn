const PackageService = require("../services/Package.service");
const response = require("../utils/response");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");
const { uploadFileHelper } = require("./FileDocument.controller");
const FileDocumentController = require("../controllers/FileDocument.controller");
const { getCachedPresignedUrl } = require("../utils/commonFunction");

class PackageController {
  addPackage = async (req, res, next) => {
    try {
      if (req.file) {
        let fileuploadresult = await uploadFileHelper(req, res);
        req.body.PackageImage = fileuploadresult.key;
      }
      const result = await PackageService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getPackageById = async (req, res, next) => {
    try {
      const options = {
        where: {
          id: req.params.id,
        },
      };
      const result = await PackageService.getById(options);
      if (!result) {
        return response.respondNotFound("Package not found", res);
      }
      return response.respondGet(result, res);
    } catch (error) {
      console.log("🚀 ~ PackageController ~ error:", error);
      return response.respondError(error, res);
    }
  };
  getPackageList = async (req, res, next) => {
    try {
      let { keyword, category, page = 1, limit = 10, status } = req.query;
      let WhereConditions = {};
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "packageName", "description"),
        };
      }
      page = Number(page);
      limit = Number(limit);
      let offset = limit * page - limit;
      const options = {
        where: WhereConditions,
        take: limit,
        skip: offset,
      };
      const result = await PackageService.findAllAndCount(options);
      await Promise.all(
        result.rows.map(async (Package) => {
          if (Package.PackageImage) {
            Package.PackageImage = await getCachedPresignedUrl(
              FileDocumentController,
              Package.PackageImage,
              300
            );
          }
        })
      );
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  updatePackage = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      req.body.status = req.body.status.toUpperCase();
      delete req.body.id;
      if (req.file) {
        let fileuploadresult = await uploadFileHelper(req, res);
        req.body.PackageImage = fileuploadresult.key;
      }
      const findPackage = await PackageService.getById(payload);
      if (!findPackage) {
        return response.respondNotFound("Package not found", res);
      }
      const result = await PackageService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  updatePackageStatus = async (req, res, next) => {
    try {
      const payload = { where: { id: req.body.id } };
      const findPackage = await PackageService.getById(payload);
      if (!findPackage) {
        return response.respondNotFound("Package not found", res);
      }
      delete req.body.id;
      if (req.file) {
        let fileuploadresult = await uploadFileHelper(req, res);
        req.body.PackageImage = fileuploadresult.key;
      }
      const result = await PackageService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  deletePackage = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };
      const findPackage = await PackageService.getById(payload);
      if (!findPackage) {
        return response.respondNotFound("Package not found", res);
      }
      const result = await PackageService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
}
module.exports = new PackageController();
