const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");
const { validateBody, verifyToken } = require("../Middleware/auth.middleware");

router.get("/", verifyToken, userController.getAll);

router.get("/:id", verifyToken, userController.getOne);

router.post("/", validateBody, userController.createOne);

router.put("/:id", verifyToken, validateBody, userController.updateOne);

router.delete("/:id", verifyToken, userController.deleteOne);

module.exports = router;
