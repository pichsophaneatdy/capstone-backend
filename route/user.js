const express = require("express");
const router = express.Router();
const {createUser} = require("../controller/user");

// User route
router.post("/", createUser);

module.exports = router;