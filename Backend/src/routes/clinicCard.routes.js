const express = require("express");
const router = express.Router();

const {
  createClinic,
  getAllClinics,
  getSingleClinic,
  updateClinic,
  deleteClinic,
} = require("../controllers/clinicCard.controller");

router.post("/", createClinic);
router.get("/", getAllClinics);
router.get("/:id", getSingleClinic);
router.put("/:id", updateClinic);
router.delete("/:id", deleteClinic);

module.exports = router;