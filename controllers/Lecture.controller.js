const LectureService = require("../services/Lecture.service");
const response = require("../utils/response");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");
class LectureController {
  addLecture = async (req, res, next) => {
    try {
      const result = await LectureService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getLectureById = async (req, res, next) => {
    try {
      const options = {
        where: {
          id: req.params.id,
        },
        include: {
          section: {
            select: ["id", "title"],
          },
        },
      };
      const result = await LectureService.getById(options);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  getLectureList = async (req, res, next) => {
    try {
      let { keyword, Type, page = 1, limit = 10, sectionId } = req.query;
      let WhereConditions = {};
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "title", "description", "Type"),
        };
      }

      //filter condition if present Type
      if (Type) {
        whereCondition.Type = Type;
      }
      if (sectionId) {
        WhereConditions.sectionId = sectionId;
      }
      page = Number(page);
      limit = Number(limit);
      let offset = limit * page - limit;
      const options = {
        where: WhereConditions,
        take: limit,
        skip: offset,
      };
      const result = await LectureService.findAllAndCount(options);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  updateLecture = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      const result = await LectureService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  deleteLecture = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };
      const result = await LectureService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
}
module.exports = new LectureController();
