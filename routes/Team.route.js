const router = require("express").Router();

const {
  addTeam,
  updateTeam,
  getTeamById,
  getTeamList,
  deleteTeam,
} = require("../controllers/Team.controller");
const {
  addTeamValidate,
  updateTeamValidate,
  getTeamByIdValidate,
  getTeamListValidate,
} = require("../validations/Team.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student } = require("../utils/commonEnum").RoleEnum();

router.post("/", Auth.AuthGuard([Student]), addTeamValidate, addTeam);
router.get(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  getTeamByIdValidate,
  getTeamById
);
router.get(
  "/",
  Auth.AuthGuard([Admin, Student]),
  getTeamListValidate,
  getTeamList
);
router.put(
  "/",
  Auth.AuthGuard([Admin, Student]),
  updateTeamValidate,
  updateTeam
);
router.delete(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  getTeamByIdValidate,
  deleteTeam
);

module.exports = router;
