const router = require("express").Router();
const {
  getAllApprovedReviews,
  submitReview,
  getAllReviewsForAdmin,
  approveReview,
  deleteReview,
} = require("../controllers/Review.controller");

const {
  submitReviewValidate,
  reviewIdValidate,
} = require("../validations/Review.validation");

const Auth = require("../middlewares/Auth.middleware");
const { Student, Admin } = require("../utils/commonEnum").RoleEnum();

// --- Public Route: Get all approved reviews (for public testimonials section) ---
router.get("/", getAllApprovedReviews);

// --- Student Route: Submit a new review ---
router.post("/", Auth.AuthGuard([Admin,Student]), submitReviewValidate, submitReview);

// --- Admin Route: Get all reviews (for moderation dashboard) ---
router.get(
  "/admin",
  Auth.AuthGuard([Admin]),
  getAllReviewsForAdmin,
  getAllReviewsForAdmin
);

// --- Admin Route: Approve a review ---
router.put(
  "/approve",
  Auth.AuthGuard([Admin]),
  reviewIdValidate,
  approveReview
);

// --- Admin Route: Delete a review ---
router.delete("/:id", Auth.AuthGuard([Admin]), reviewIdValidate, deleteReview);

module.exports = router;
