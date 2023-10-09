const express = require("express");
const router = express.Router();
const path = require("path");
const {
  login,
  register,
  change,
  logout,
} = require("../controller/auth_controller");

router.post("/login", login);
router.post("/register", register);
router.put("/change_password", change);
router.get("/logout", logout);

module.exports = router;
