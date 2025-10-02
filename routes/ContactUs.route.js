// const rateLimit = require("express-rate-limit");
const router = require("express").Router();

const {
  addContactUsMessage,
  listMessages,
  updateStatus
} = require("../controllers/ContactUs.controller");
const {
    addContactUsValidate,
    updateStatusValidate
} = require("../validations/ContactUs.validation");

router.post("/", 
  // contactLimiter, 
  addContactUsValidate,
    addContactUsMessage
);
router.get("/", listMessages);
router.put("/:id/status", updateStatusValidate,updateStatus);

module.exports = router; 
