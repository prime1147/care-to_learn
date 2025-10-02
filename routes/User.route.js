const router = require("express").Router();

const {
  signupUser,
  getUserById,
  getUserList,
  getUsers,
  updateUser,
  deleteUser,
  addSuperAdmin,
  updateUserStatus,
  getTotalcount,
  getOrganisationsUserList,
} = require("../controllers/User.controller");

const {
  signupValidate,
  getUsersValidate,
  getUserByIdValidate,
  getUserListValidate,
  updateUserValidate,
  updateUserStatusValidate,
  getOrganisationsUserListValidate,
} = require("../validations/User.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin, Student, Organisations } = require("../utils/commonEnum").RoleEnum();

router.post("/signup", signupValidate, signupUser);
router.get(
  "/dropdownusers",
  Auth.AuthGuard([Admin, Organisations]),
  getUsersValidate,
  getUsers
);
router.get(
  "/totalcounts",
  //  Auth.AuthGuard([Admin, Student]),
  getTotalcount
);
router.get(
  "/:id",
  Auth.AuthGuard([Admin, Student, Organisations]),
  getUserByIdValidate,
  getUserById
);
router.get("/", Auth.AuthGuard([Admin, Organisations]), getUserListValidate, getUserList);

router.get("/organisation/users", Auth.AuthGuard([Admin]), getOrganisationsUserListValidate, getOrganisationsUserList);


router.put(
  "/",
  Auth.AuthGuard([Admin, Student, Organisations]),
  updateUserValidate,
  updateUser
);
router.patch(
  "/updateUserStatus",
  Auth.AuthGuard([Admin, Student, Organisations]),
  updateUserStatusValidate,
  updateUserStatus
);
router.delete(
  "/:id",
  Auth.AuthGuard([Admin, Student, Organisations]),
  getUserByIdValidate,
  deleteUser
);
router.post("/superAdmin", addSuperAdmin);
module.exports = router;
