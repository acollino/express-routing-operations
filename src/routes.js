const express = require("express");
const router = express.Router();
const { mean, median, mode } = require("./controller");

router.get("/mean", mean);

router.get("/median", median);

router.get("/mode", mode);

module.exports = router;
