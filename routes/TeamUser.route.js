const router = require("express").Router();

const {
  addTeamUser,
  updateTeamUser,
  getTeamUserById,
  getTeamUserList,
  deleteTeamUser,
} = require("../controllers/TeamUser.controller");
const {
  addTeamUserValidate,
  updateTeamUserValidate,
  getTeamUserByIdValidate,
  getTeamUserListValidate,
} = require("../validations/TeamUser.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student } = require("../utils/commonEnum").RoleEnum();

router.post("/", Auth.AuthGuard([Student]), addTeamUserValidate, addTeamUser);
router.get(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  getTeamUserByIdValidate,
  getTeamUserById
);
router.get(
  "/",
  Auth.AuthGuard([Admin, Student]),
  getTeamUserListValidate,
  getTeamUserList
);

router.delete(
  "/:id",
  Auth.AuthGuard([Admin, Student]),
  getTeamUserByIdValidate,
  deleteTeamUser
);

module.exports = router;
