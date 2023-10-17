const express = require("express");
const router = express.Router();

const companyController = require("../controller/company");

router.post("/company", companyController.create);

module.exports = router;