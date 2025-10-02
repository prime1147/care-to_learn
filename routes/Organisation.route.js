const router = require("express").Router();

const {
  addOrganisation,
  updateOrganisation,
  getOrganisationById,
  getOrganisationList,
  deleteOrganisation,
  updateOrganisationStatus,
} = require("../controllers/Organisation.controller");
const {
  addOrganisationValidate,
  updateOrganisationValidate,
  getOrganisationByIdValidate,
  getOrganisationListValidate,
  updateOrganisationStatusValidate,
} = require("../validations/Organisation.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student } = require("../utils/commonEnum").RoleEnum();
const multer = require("multer");
const upload = multer(); // memory storage

router.post(
  "/",
  // Auth.AuthGuard([Admin, Student]),
  // upload.single("OrganisationImage"),
  addOrganisationValidate,
  addOrganisation
);
router.get(
  "/:id",
  // Auth.AuthGuard([Admin, Student]),
  getOrganisationByIdValidate,
  getOrganisationById
);
router.get(
  "/",
  // Auth.AuthGuard([Admin, Student]),
  getOrganisationListValidate,
  getOrganisationList
);
router.put(
  "/",
  // Auth.AuthGuard([Admin, Student]),
    upload.single("OrganisationImage"), // optional for update
  updateOrganisationValidate,
  updateOrganisation
);
router.patch(
  "/updateOrganisationStatus",
  // Auth.AuthGuard([Admin, Student]),
  updateOrganisationStatusValidate,
  updateOrganisationStatus
);
router.delete(
  "/:id",
  // Auth.AuthGuard([Admin, Student]),
  getOrganisationByIdValidate,
  deleteOrganisation
);

module.exports = router;
