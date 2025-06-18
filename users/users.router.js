const express = require("express");

const router = express.Router();

const UsersController = require("./users.controller");

router.post("/signup", UsersController.createUserController);
router.post("/login", UsersController.loginUserController);

module.exports = router;
