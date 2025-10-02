const CourseUserService = require("../services/CourseUser.service");
const response = require("../utils/response");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");
class CourseUserController {
  addCourseUser = async (req, res, next) => {
    try {
      const results = await Promise.all(
        req.body.users.map((user) => {
          const payload = {
            courseId: req.body.courseId,
            userId: user.userId,
            status: "ACTIVE",
            startDate: new Date(user.startDate),
            endDate: new Date(user.endDate),
            Budget: 0,
          };
          return CourseUserService.add(payload);
        })
      );
      return response.respondPost(results, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getCourseUserById = async (req, res, next) => {
    try {
      const { courseId } = req.params;
      console.log("courseId: ", courseId);
      const options = {
        where: {
          courseId: courseId,
        },
        include: {
          course: true,
          user: true,
        },
      };
      console.log("options: ", options);
      const result = await CourseUserService.findAllAndCount(options);
      console.log("result: ", result);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("🚀 ~ CourseUserController ~ error:", error);
      return response.respondError(error, res);
    }
  };
  getCourseUserList = async (req, res, next) => {
    try {
      let { keyword, page = 1, limit = 10 } = req.query;
      let WhereConditions;
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "fullName"),
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
      const result = await CourseUserService.findAllAndCount(options);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  updateCourseUser = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      console.log("req.body: ", req.body);
      delete req.body.id;
      req.body.startDate = new Date(req.body.startDate);
      req.body.endDate = new Date(req.body.endDate);
      const result = await CourseUserService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  deleteCourseUser = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };

      console.log("🚀 ~ CourseUserController ~ payload:", payload)
      const result = await CourseUserService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
}
module.exports = new CourseUserController();
