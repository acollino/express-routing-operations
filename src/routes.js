const express = require("express");
const router = express.Router();
const operationControl = require("./controller");

router.get("/", operationControl.index);

router.get("/mean", operationControl.mean);

router.get("/median", operationControl.median);

router.get("/mode", operationControl.mode);

module.exports = router;
