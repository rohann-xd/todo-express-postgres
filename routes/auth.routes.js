const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validator.js");

const { registerSchema } = require("../validations/auth.validation");

const { register } = require("../controllers/auth.controller");

// Public Routes
router.post("/signup", validate(registerSchema), register);

module.exports = router;
