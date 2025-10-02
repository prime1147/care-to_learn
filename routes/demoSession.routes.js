// routes.js (or wherever your demo session routes are defined)
const express = require("express");
const router = express.Router();

// CORRECT IMPORT: Import the entire instance
const DemoSessionController = require("../controllers/DemoSession.controller");

const AuthMiddleware = require("../middlewares/Auth.middleware");

// Correct Import for Validation: Your validation methods are also class methods
const DemoSessionValidation = require("../validations/DemoSession.validation");

const {Admin,Student}=require("../utils/commonEnum").RoleEnum();

// Route for booking a demo
router.post(
  "/demo-sessions/book",
  AuthMiddleware.AuthGuard([Student]),
  DemoSessionValidation.bookDemoValidate, // Already a bound method if using class instance
  DemoSessionController.bookDemo // CORRECT: Access method from the instance
);

// Admin Routes (require authentication and role check)
router.get(
  "/admin/demo-sessions",
  AuthMiddleware.AuthGuard([Admin]),
  DemoSessionValidation.getDemoSessionListValidate,
  DemoSessionController.getAllDemoSessions // CORRECT: Access method from the instance
);

router.get(
  "/admin/demo-sessions/:id",
  AuthMiddleware.AuthGuard([Admin]),
  DemoSessionValidation.getDemoSessionByIdValidate,
  DemoSessionController.getDemoSessionById // CORRECT: Access method from the instance
);

router.put(
  "/admin/demo-sessions/:id",
  AuthMiddleware.AuthGuard([Admin]),
  DemoSessionValidation.updateDemoSessionValidate,
  DemoSessionController.updateDemoSession // CORRECT: Access method from the instance
);

router.delete(
  "/admin/demo-sessions/:id",
  AuthMiddleware.AuthGuard([Admin]),
  DemoSessionValidation.getDemoSessionByIdValidate,
  DemoSessionController.deleteDemoSession // CORRECT: Access method from the instance
);

module.exports = router;
