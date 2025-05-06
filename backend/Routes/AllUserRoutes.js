const express = require("express");
const router = express.Router();

const {
  registerUser,
  authAllUser,
} = require("../Controllers/AllUserController");

router.route("/").post(registerUser);
router.post("/login", authAllUser);

module.exports = router;
