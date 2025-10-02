const router = require("express").Router();

const {
  addFAQ,
  updateFAQ,
  getFAQById,
  getFAQList,
  deleteFAQ,
  toggleFAQStatus,
} = require("../controllers/Faq.controller");

const {
  addFAQValidate,
  updateFAQValidate,
  getFAQByIdValidate,
  getFAQListValidate,
  toggleFAQStatusValidate,
} = require("../validations/Faq.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Admin } = require("../utils/commonEnum").RoleEnum();

// Create FAQ
router.post(
  "/",
  Auth.AuthGuard([Admin]),
  addFAQValidate,
  addFAQ
);

// Get FAQ list (with pagination & search)
router.get(
  "/",
  Auth.AuthGuard([Admin]),
  getFAQListValidate,
  getFAQList
);

// Get FAQ by ID
router.get(
  "/:id",
  Auth.AuthGuard([Admin]),
  getFAQByIdValidate,
  getFAQById
);

// Update FAQ
router.put(
  "/",
  Auth.AuthGuard([Admin]),
  updateFAQValidate,
  updateFAQ
);

// Delete FAQ
router.delete(
  "/:id",
  Auth.AuthGuard([Admin]),
//   getFAQByIdValidate,
  deleteFAQ
);

// Toggle FAQ active status
router.put(
  "/toggle-status",
  Auth.AuthGuard([Admin]),
  toggleFAQStatusValidate,
  toggleFAQStatus
);

module.exports = router;
