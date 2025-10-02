const router = require("express").Router();

const {
  addCourseUser,
  updateCourseUser,
  getCourseUserById,
  getCourseUserList,
  deleteCourseUser,
} = require("../controllers/CourseUser.controller");
const {
  addCourseUserValidate,
  updateCourseUserValidate,
  getCourseUserByIdValidate,deleteCourseUserByIdValidate,
  getCourseUserListValidate,
} = require("../validations/CourseUser.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student } = require("../utils/commonEnum").RoleEnum();

router.post(
  "/",
  Auth.AuthGuard([Admin]),
  addCourseUserValidate,
  addCourseUser
);
router.put(
  "/",
  Auth.AuthGuard([Admin]),
  updateCourseUserValidate,
  updateCourseUser
);
router.get(
  "/:courseId",
  Auth.AuthGuard([Admin, Student]),
  getCourseUserByIdValidate,
  getCourseUserById
);

router.delete(
  "/:id",
  Auth.AuthGuard([Admin]),
  deleteCourseUserByIdValidate,
  deleteCourseUser
);

module.exports = router;