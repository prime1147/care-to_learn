const router = require("express").Router();

const {
  addProject,
  updateProject,
  getProjectById,
  getProjectList,
  deleteProject,
} = require("../controllers/Project.controller");

const {
  addProjectValidate,
  updateProjectValidate,
  getProjectByIdValidate,
  getProjectListValidate,
} = require("../validations/Project.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student } = require("../utils/commonEnum").RoleEnum();

router.post("/", Auth.AuthGuard([Admin,Student]), addProjectValidate, addProject);

router.get(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  getProjectByIdValidate,
  getProjectById
);

router.get(
  "/",
  Auth.AuthGuard([Admin, Student]),
  getProjectListValidate,
  getProjectList
);

router.put(
  "/",
  Auth.AuthGuard([Admin]),
  updateProjectValidate,
  updateProject
);


router.delete(
  "/:id",
  Auth.AuthGuard([Admin]),
  getProjectByIdValidate,
  deleteProject
);

module.exports = router;
