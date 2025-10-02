const router = require("express").Router();

const {
  addCourseTopic,
  updateCourseTopic,
  getCourseTopicById,
  getCourseTopicList,
  deleteCourseTopic,
} = require("../controllers/CourseTopic.controller");
const {
  addCourseTopicValidate,
  updateCourseTopicValidate,
  getCourseTopicByIdValidate,
  getCourseTopicListValidate,
} = require("../validations/CourseTopic.validation.js");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student } = require("../utils/commonEnum").RoleEnum();

router.post(
  "/",
  Auth.AuthGuard([Admin]),
  addCourseTopicValidate,
  addCourseTopic
);
router.get(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  getCourseTopicByIdValidate,
  getCourseTopicById
);
router.get(
  "/",
  Auth.AuthGuard([Admin, Student]),
  getCourseTopicListValidate,
  getCourseTopicList
);
router.put(
  "/",
  Auth.AuthGuard([Admin]),
  updateCourseTopicValidate,
  updateCourseTopic
);
router.delete(
  "/:id",
  Auth.AuthGuard([Admin]),
  getCourseTopicByIdValidate,
  deleteCourseTopic
);

module.exports = router;
