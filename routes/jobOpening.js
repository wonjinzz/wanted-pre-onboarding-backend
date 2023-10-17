const express = require("express");
const router = express.Router();

const jobOpeningController = require("../controller/jobOpening");

router.post("/job-openings", jobOpeningController.create);
router.patch("/job-openings/:openingId", jobOpeningController.update);
router.delete("/job-openings/:jobOpening_id/:company_id", jobOpeningController.delete);
router.get("/job-openings/:company_id", jobOpeningController.get);


module.exports = router;