const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/patient.controller");

router.post("/", appointmentController.createAppointment);
router.get("/", appointmentController.getAllAppointments); 
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;