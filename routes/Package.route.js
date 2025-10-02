const router = require("express").Router();

const {
  addPackage,
  updatePackage,
  getPackageById,
  getPackageList,
  deletePackage,
  updatePackageStatus,
} = require("../controllers/Package.controller");
const {
  addPackageValidate,
  updatePackageValidate,
  getPackageByIdValidate,
  getPackageListValidate,
  updatePackageStatusValidate,
} = require("../validations/Package.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student } = require("../utils/commonEnum").RoleEnum();
const multer = require("multer");
const upload = multer(); // memory storage

router.post(
  "/",
  Auth.AuthGuard([Admin, Student]),
  addPackageValidate,
  addPackage
);
router.get(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  getPackageByIdValidate,
  getPackageById
);
router.get(
  "/",
  Auth.AuthGuard([Admin, Student]),
  getPackageListValidate,
  getPackageList
);
router.put(
  "/",
  Auth.AuthGuard([Admin, Student]),
    upload.single("PackageImage"), // optional for update
  updatePackageValidate,
  updatePackage
);
router.patch(
  "/updatePackageStatus",
  Auth.AuthGuard([Admin, Student]),
  updatePackageStatusValidate,
  updatePackageStatus
);
router.delete(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  getPackageByIdValidate,
  deletePackage
);

module.exports = router;
