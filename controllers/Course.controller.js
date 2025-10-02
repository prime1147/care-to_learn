const CourseService = require("../services/Course.service");
const response = require("../utils/response");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");
const { uploadFileHelper } = require("./FileDocument.controller");
const FileDocumentController = require("../controllers/FileDocument.controller"); // ✅ import once
const { getCachedPresignedUrl } = require("../utils/commonFunction");
class CourseController {
  addCourse = async (req, res, next) => {
    try {
      if (req.file) {
        let fileuploadresult = await uploadFileHelper(req, res);
        req.body.CourseImage = fileuploadresult.key;
      }
      req.body.level = req.body.level.toUpperCase();
      console.log("req.body: ", req.body);
      const result = await CourseService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getCourseById = async (req, res, next) => {
    try {
      console.log("INSIDE GET COURSE BY ID");
      const options = {
        where: {
          id: req.params.id,
        },
        include: {
          sections: {
            include: {
              lectures: true,
            },
          },
        },
      };
      const result = await CourseService.getById(options);
      console.log("result: ", result);
      if (!result) {
        return response.respondNotFound("Course not found", res);
      }
      if (result.CourseImage) {
        result.CourseImage = await getCachedPresignedUrl(
          FileDocumentController,
          result.CourseImage,
          300 // 5 mins standard expiry
        );
      }
      return response.respondGet(result, res);
    } catch (error) {
      console.log("🚀 ~ CourseController ~ error:", error);
      return response.respondError(error, res);
    }
  };
  getCourseList = async (req, res, next) => {
    try {
      let { keyword, category, page = 1, limit = 10, status } = req.query;
      let WhereConditions = {};
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "title", "description", "category"),
        };
      }

      //filter condition if present category
      if (category) {
        WhereConditions.category = category;
      }
      if (status) {
        WhereConditions.status = status;
      }
      page = Number(page);
      limit = Number(limit);
      let offset = limit * page - limit;
      const options = {
        where: WhereConditions,
        include: {
          _count: {
            select: {
              courseUsers: true,
            },
          },
        },
        take: limit,
        skip: offset,
      };
      const result = await CourseService.findAllAndCount(options);
      await Promise.all(
        result.rows.map(async (course) => {
          if (course.CourseImage) {
            course.CourseImage = await getCachedPresignedUrl(
              FileDocumentController,
              course.CourseImage,
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
  updateCourse = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      if (req.file) {
        let fileuploadresult = await uploadFileHelper(req, res);
        req.body.CourseImage = fileuploadresult.key;
      }
      req.body.level = req.body.level.toUpperCase();
      delete req.body.id;
      console.log("req.body: ", req.body);
      const findCourse = await CourseService.getById(payload);
      if (!findCourse) {
        return response.respondNotFound("Course not found", res);
      }
      const result = await CourseService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  updateCourseStatus = async (req, res, next) => {
    try {
      const payload = { where: { id: req.body.id } };
      const findCourse = await CourseService.getById(payload);
      if (!findCourse) {
        return response.respondNotFound("Course not found", res);
      }
      if (req.file) {
        let fileuploadresult = await uploadFileHelper(req, res);
        req.body.CourseImage = fileuploadresult.key;
      }
      req.body.status = req.body.status.toUpperCase();
      delete req.body.id;
      const result = await CourseService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  deleteCourse = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };
      const findCourse = await CourseService.getById(payload);
      if (!findCourse) {
        return response.respondNotFound("Course not found", res);
      }
      const result = await CourseService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
}
module.exports = new CourseController();
