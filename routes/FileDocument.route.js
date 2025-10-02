const express = require("express");
const multer = require("multer");
const upload = multer(); // memory storage
const {
  uploadFile,
  getPresignedUrl,
} = require("../controllers/FileDocument.controller");
const router = require("express").Router();
const { Admin, Student, Organisations } = require("../utils/commonEnum").RoleEnum();
const Auth = require("../middlewares/Auth.middleware");

router.post(
  "/upload",
  Auth.AuthGuard([Admin, Student, Organisations]),
  upload.single("file"),
  uploadFile
);
router.get("/link", Auth.AuthGuard([Admin, Student, Organisations]), getPresignedUrl);

module.exports = router;
