const express = require("express");
const router = express.Router();

router.get("/mean");

router.get("/median");

router.get("/mode");

module.exports = router;
