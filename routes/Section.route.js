const router = require("express").Router();

const {
  addSection,
  updateSection,
  getSectionById,
  getSectionList,
  deleteSection,
} = require("../controllers/Section.controller");
// const {
//   addSectionValidate,
//   updateSectionValidate,
//   getSectionByIdValidate,
//   getSectionListValidate,
// } = require("../validations/Section.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student } = require("../utils/commonEnum").RoleEnum();

router.post(
  "/",
  Auth.AuthGuard([Admin, Student]),
  // addSectionValidate,
  addSection
);
router.get(
  "/:id",
  // Auth.AuthGuard([Admin, Student]),
  // getSectionByIdValidate,
  getSectionById
);
router.get(
  "/",
  // Auth.AuthGuard([Admin, Student]),
  // getSectionListValidate,
  getSectionList
);
router.put(
  "/",
  Auth.AuthGuard([Admin, Student]),
  // updateSectionValidate,
  updateSection
);
router.delete(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  // getSectionByIdValidate,
  deleteSection
);

module.exports = router;
