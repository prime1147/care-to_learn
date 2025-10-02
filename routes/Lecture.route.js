const router = require("express").Router();

const {
  addLecture,
  updateLecture,
  getLectureById,
  getLectureList,
  deleteLecture,
} = require("../controllers/Lecture.controller");
// const {
//   addLectureValidate,
//   updateLectureValidate,
//   getLectureByIdValidate,
//   getLectureListValidate,
// } = require("../validations/Lecture.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student } = require("../utils/commonEnum").RoleEnum();

router.post(
  "/",
  Auth.AuthGuard([Admin, Student]),
  // addLectureValidate,
  addLecture
);
router.get(
  "/:id",
  // Auth.AuthGuard([Admin, Student]),
  // getLectureByIdValidate,
  getLectureById
);
router.get(
  "/",
  // Auth.AuthGuard([Admin, Student]),
  // getLectureListValidate,
  getLectureList
);
router.put(
  "/",
  Auth.AuthGuard([Admin, Student]),
  // updateLectureValidate,
  updateLecture
);
router.delete(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  // getLectureByIdValidate,
  deleteLecture
);

module.exports = router;
