const express = require("express");
const router = express.Router();
const authController = require("../Controller/auth.controller");
const { validateBody } = require("../Middleware/auth.middleware");

router.post("/register", validateBody, authController.register);
router.post("/sign-in", validateBody, authController.signin);
router.post("/logout", authController.logout);
router.post("/refreshToken", authController.refreshToken);

module.exports = router;
