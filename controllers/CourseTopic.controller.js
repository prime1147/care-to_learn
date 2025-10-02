const CourseTopicService = require("../services/CourseTopic.service");
const response = require("../utils/response");
const { searchCondition } = require("../utils/conditionFilters");
class CourseTopicController {
  addCourseTopic = async (req, res, next) => {
    try {
      const result = await CourseTopicService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getCourseTopicById = async (req, res, next) => {
    try {
      let payload = {
        where: {
          id: req.params.id,
        },
      };
      const result = await CourseTopicService.getById(payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  getCourseTopicList = async (req, res, next) => {
    try {
      let { keyword, page = 1, limit = 10, courseId } = req.query;
      let WhereConditions;
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "title"),
        };
      }
      if (courseId) {
        WhereConditions = {
          ...WhereConditions,
          courseId: courseId,
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
      const result = await CourseTopicService.findAllAndCount(options);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  updateCourseTopic = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      req.body.status = req.body.status.toUpperCase();
      delete req.body.id;
      const result = await CourseTopicService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  deleteCourseTopic = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };
      const result = await CourseTopicService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
}
module.exports = new CourseTopicController();
