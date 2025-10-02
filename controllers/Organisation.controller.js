const OrganisationService = require("../services/Organisation.service");
const response = require("../utils/response");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");
const { uploadFileHelper } = require("./FileDocument.controller");
const FileDocumentController = require("../controllers/FileDocument.controller"); // ✅ import once
const { getCachedPresignedUrl } = require("../utils/commonFunction");

class OrganisationController {
  addOrganisation = async (req, res, next) => {
    try {
      if (req.file) {
        let fileuploadresult = await uploadFileHelper(req, res);
        req.body.OrganisationImage = fileuploadresult.key;
      }
      const result = await OrganisationService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getOrganisationById = async (req, res, next) => {
    try {
      const options = {
        where: {
          id: req.params.id,
        },
      };
      const result = await OrganisationService.getById(options);
      if (!result) {
        return response.respondNotFound("Organisation not found", res);
      }
      if (result.OrganisationImage) {
        result.OrganisationImage = await getCachedPresignedUrl(
          FileDocumentController,
          result.OrganisationImage,
          300 // 5 mins standard expiry
        );
      }
      return response.respondGet(result, res);
    } catch (error) {
      console.log("🚀 ~ OrganisationController ~ error:", error);
      return response.respondError(error, res);
    }
  };
  getOrganisationList = async (req, res, next) => {
    try {
      let { keyword, page = 1, limit = 10 } = req.query;
      let WhereConditions = {};
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "OrganisationName"),
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
      const result = await OrganisationService.findAllAndCount(options);
      await Promise.all(
        result.rows.map(async (Organisation) => {
          if (Organisation.OrganisationImage) {
            Organisation.OrganisationImage = await getCachedPresignedUrl(
              FileDocumentController,
              Organisation.OrganisationImage,
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
  updateOrganisation = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      if (req.file) {
        let fileuploadresult = await uploadFileHelper(req, res);
        req.body.OrganisationImage = fileuploadresult.key;
      }
      const findOrganisation = await OrganisationService.getById(payload);
      if (!findOrganisation) {
        return response.respondNotFound("Organisation not found", res);
      }
      const result = await OrganisationService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  updateOrganisationStatus = async (req, res, next) => {
    try {
      const payload = { where: { id: req.body.id } };
      const findOrganisation = await OrganisationService.getById(payload);
      if (!findOrganisation) {
        return response.respondNotFound("Organisation not found", res);
      }
      delete req.body.id;
      if (req.file) {
        let fileuploadresult = await uploadFileHelper(req, res);
        req.body.OrganisationImage = fileuploadresult.key;
      }
      const result = await OrganisationService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  deleteOrganisation = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };
      const findOrganisation = await OrganisationService.getById(payload);
      if (!findOrganisation) {
        return response.respondNotFound("Organisation not found", res);
      }
      const result = await OrganisationService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
}
module.exports = new OrganisationController();
