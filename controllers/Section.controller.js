const SectionService = require("../services/Section.service");
const response = require("../utils/response");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");
class SectionController {
  addSection = async (req, res, next) => {
    try {
      const result = await SectionService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getSectionById = async (req, res, next) => {
    try {
      const options = {
        where: {
          id: req.params.id,
        },
        include: {
          lectures: true
        },
      };
      const result = await SectionService.getById(options);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  getSectionList = async (req, res, next) => {
    try {
      let { keyword, Type, page = 1, limit = 10, courseId } = req.query;
      let WhereConditions = {};
      if (keyword) {
        WhereConditions = {
          ...WhereConditions,
          ...searchCondition(keyword, "title", "description", "Type"),
        };
      }

      //filter condition if present Type
      if (Type) {
        WhereConditions.Type = Type;
      }
      if (courseId) {
        WhereConditions.courseId = courseId;
      }
      page = Number(page);
      limit = Number(limit);
      let offset = limit * page - limit;
      const options = {
        where: WhereConditions,
        take: limit,
        skip: offset,
      };
      const result = await SectionService.findAllAndCount(options);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  updateSection = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      const result = await SectionService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  deleteSection = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };
      const result = await SectionService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
}
module.exports = new SectionController();
