const express = require("express");
const router = express.Router();

const jobApplicationController = require("../controller/jobApplication");

router.post("/job-applications", jobApplicationController.create);

module.exports = router;