const express = require("express");
const router = express.Router();

const { submitFeedback } = require("../controllers/Feedback");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.post("/submit-feedback", authMiddleware, submitFeedback);



module.exports = router;
