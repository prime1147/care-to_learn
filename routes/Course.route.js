const router = require("express").Router();

const {
  addCourse,
  updateCourse,
  getCourseById,
  getCourseList,
  deleteCourse,
  updateCourseStatus,
} = require("../controllers/Course.controller");
const {
  addCourseValidate,
  updateCourseValidate,
  getCourseByIdValidate,
  getCourseListValidate,
  updateCourseStatusValidate,
} = require("../validations/Course.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student } = require("../utils/commonEnum").RoleEnum();
const multer = require("multer");
const upload = multer(); // memory storage

router.post(
  "/",
  Auth.AuthGuard([Admin, Student]),
  upload.single("CourseImage"),
  addCourseValidate,
  addCourse
);
router.get(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  getCourseByIdValidate,
  getCourseById
);
router.get(
  "/",
  // Auth.AuthGuard([Admin, Student]),
  getCourseListValidate,
  getCourseList
);
router.put(
  "/",
  Auth.AuthGuard([Admin, Student]),
    upload.single("CourseImage"), // optional for update
  updateCourseValidate,
  updateCourse
);
router.patch(
  "/updateCourseStatus",
  Auth.AuthGuard([Admin, Student]),
  updateCourseStatusValidate,
  updateCourseStatus
);
router.delete(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  getCourseByIdValidate,
  deleteCourse
);

module.exports = router;
